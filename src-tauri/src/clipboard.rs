use arboard::Clipboard;

use mouse_position::mouse_position::{
    Mouse,
};

use serde_json;

use std::{
    thread,
    time::Duration,
};

use tauri::{
    Emitter,
    Manager,
};

use crate::{
    database,
    detectors,
};

pub fn start_clipboard_watcher(
    app_handle: tauri::AppHandle,
) {

    thread::spawn(move || {

        let mut clipboard = Clipboard::new()
            .expect(
                "Failed to access clipboard"
            );

        let mut last_text =
            String::new();

        println!(
            "Clipboard watcher started"
        );

        loop {

            match clipboard.get_text() {

                Ok(text) => {

                    let trimmed =
                        text.trim();

                    // Ignore empty
                    if trimmed.is_empty() {

                        thread::sleep(
                            Duration::from_millis(500)
                        );

                        continue;
                    }

                    // Ignore duplicates
                    if trimmed == last_text {

                        thread::sleep(
                            Duration::from_millis(500)
                        );

                        continue;
                    }

                    println!(
                        "Copied: {}",
                        trimmed
                    );

                    let detected_type =
                        detectors::detect_type(
                            trimmed
                        );

                    println!(
                        "Detected: {:?}",
                        detected_type
                    );

                    // Save to DB
                    database::save_clipboard(

                        trimmed,

                        &format!(
                            "{:?}",
                            detected_type
                        ),
                    );

                    // Update main window UI
                    app_handle.emit(

                        "clipboard-updated",

                        trimmed.to_string()

                    ).unwrap();

                    // Handle popup window
                    if let Some(window)

                        = app_handle
                            .get_webview_window(
                                "popup"
                            )
                    {

                        // Send popup content
                        window.emit(

                            "clipboard-popup",

                            serde_json::json!({

                                "content": trimmed,

                                "type": format!(
                                    "{:?}",
                                    detected_type
                                )
                            })

                        ).unwrap();

                        // Position near cursor
                        if let Mouse::Position {

                            x,

                            y,

                        } = Mouse::get_mouse_position()
                        {

                            let _ =
                                window.set_position(

                                    tauri::Position::Physical(

                                        tauri::PhysicalPosition {

                                            x: x as i32 + 20,

                                            y: y as i32 + 20,
                                        }
                                    )
                                );
                        }

                        // Show popup
                        if let Err(err)
                            = window.show()
                        {

                            println!(
                                "Popup show error: {:?}",
                                err
                            );
                        }
                    }

                    // Update last copied value
                    last_text =
                        trimmed.to_string();
                }

                // Ignore unavailable clipboard states
                Err(_) => {}
            }

            thread::sleep(
                Duration::from_millis(5000)
            );
        }
    });
}