use serde::Serialize;


#[derive(Debug, Serialize, Clone)]

pub enum ClipboardType {

    GithubUrl,

    Url,

    Json,

    HexColor,

    FilePath,

    Text,
}

pub fn detect_type(content: &str)
    -> ClipboardType
{

    let text = content.trim();

    if text.contains("github.com") {

        return ClipboardType::GithubUrl;
    }

    if text.starts_with("http://")
        || text.starts_with("https://")
    {

        return ClipboardType::Url;
    }

    if text.starts_with("{")
        && text.ends_with("}")
    {

        return ClipboardType::Json;
    }

    if text.starts_with("#")
        && (text.len() == 7 || text.len() == 4)
    {

        return ClipboardType::HexColor;
    }

    if text.contains(":\\")
        || text.starts_with("/")
    {

        return ClipboardType::FilePath;
    }

    ClipboardType::Text
}