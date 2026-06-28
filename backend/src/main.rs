use axum::{Router, Json, extract::Query};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct SoundQuery { location: Option<String> }

#[derive(Serialize)]
struct Sound { id: String, name: String, location: String, duration: String, url: String }

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    let app = Router::new()
        .route("/", axum::routing::get(root))
        .route("/health", axum::routing::get(health))
        .route("/sounds", axum::routing::get(get_sounds))
        .layer(tower_http::cors::CorsLayer::permissive());
    let port = std::env::var("PORT").unwrap_or_else(|_| "3001".into());
    let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{}", port)).await.unwrap();
    tracing::info!("earth backend running on :{}", port);
    axum::serve(listener, app).await.unwrap();
}

async fn root() -> Json<serde_json::Value> { Json(serde_json::json!({"service": "earth", "status": "running"})) }
async fn health() -> Json<serde_json::Value> { Json(serde_json::json!({"status": "healthy"})) }

async fn get_sounds(Query(q): Query<SoundQuery>) -> Json<serde_json::Value> {
    let location = q.location.unwrap_or_else(|| "forest".into());
    let sounds = vec![
        Sound { id: "1".into(), name: format!("{} Ambience", location), location: location.clone(), duration: "3:45".into(), url: format!("/audio/{}.mp3", location) },
        Sound { id: "2".into(), name: format!("{} Night", location), location: location.clone(), duration: "5:20".into(), url: format!("/audio/{}_night.mp3", location) },
    ];
    Json(serde_json::json!({ "sounds": sounds, "location": location }))
}
