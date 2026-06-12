// Prevents additional console window on Windows in release, DO NOT REMOVE!!

mod clipboard;
mod database;
mod detectors;
mod actions;

use tauri::{
    Listener,
    Manager,
    WebviewUrl,
    WebviewWindowBuilder,
};

#[tauri::command]
fn get_clipboard_history()
    -> Vec<database::ClipboardItem>
{
    database::get_history()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    database::init_db()
        .expect("DB failed");

    tauri::Builder::default()

        .invoke_handler(
            tauri::generate_handler![

                get_clipboard_history,

                actions::open_url,

                actions::clone_repo,
            ]
        )

        .setup(|app| {

            clipboard::start_clipboard_watcher(
                app.handle().clone()
            );

            WebviewWindowBuilder::new(

                app,

                "popup",

                WebviewUrl::External(

                    "http://localhost:1420/popup"
                        .parse()
                        .unwrap()
                ),
            )

            .title("ClipStack Popup")

            .inner_size(340.0, 160.0)

            .decorations(false)

            .resizable(false)

            .always_on_top(true)

            .skip_taskbar(true)

            .visible(false)

            .shadow(false)

            .transparent(true)

            .build()?;


            let app_handle =
                app.handle().clone();

            app.listen(

                "hide-popup",

                move |_| {

                    if let Some(window)

                        = app_handle
                            .get_webview_window(
                                "popup"
                            )
                    {

                        let _ = window.hide();
                    }
                }
            );

            Ok(())
        })

        .run(
            tauri::generate_context!()
        )

        .expect(
            "error while running tauri application"
        );
}

fn main() {

    run();
}