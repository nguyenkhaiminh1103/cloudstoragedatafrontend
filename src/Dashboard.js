import React, { useState, useEffect } from "react";
import api from "./api";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    try {
      const res = await api.get("/files");
      setFiles(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      await api.post("/upload", form);
      alert("Upload thành công");
      await fetchFiles();
    } catch (err) {
      alert("Upload thất bại");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="upload-box">
        <h2>Upload file</h2>
        <input type="file" onChange={upload} disabled={uploading} />
      </div>

      <div className="file-list">
        <h3>Files</h3>
        {files.length === 0 ? (
          <p>No files yet</p>
        ) : (
          <div className="cards">
            {files.map((f) => (
              <div className="card" key={f.name}>
                <div className="card-body">
                  <a href={f.url} target="_blank" rel="noreferrer">
                    {f.name}
                  </a>
                  <div className="meta">{(f.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
