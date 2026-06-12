use std::process::Command;

#[tauri::command]

pub fn open_url(url: String) {

    #[cfg(target_os = "windows")]
    {
        Command::new("cmd")
            .args([
                "/C",
                "start",
                &url
            ])
            .spawn()
            .unwrap();
    }
}

#[tauri::command]

pub fn clone_repo(url: String) {

    #[cfg(target_os = "windows")]
    {
        Command::new("cmd")
            .args([
                "/C",
                "start",
                "cmd",
                "/K",
                &format!("git clone {}", url)
            ])
            .spawn()
            .unwrap();
    }
}