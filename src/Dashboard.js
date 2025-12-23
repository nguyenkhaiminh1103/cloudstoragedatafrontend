import React, { useState, useEffect } from "react";
import api from "./api";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("newest");

  const fetchFiles = async (query = q, sortBy = sort) => {
    try {
      const res = await api.get("/files", { params: { q: query || undefined, sort: sortBy === 'newest' ? undefined : (sortBy === 'oldest' ? 'oldest' : (sortBy === 'size' ? 'size' : undefined)) } });
      setFiles(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    // refetch when search or sort changes
    fetchFiles(q, sort);
  }, [q, sort]);

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      // Ensure token is explicitly sent for debugging (api interceptor also sets it)
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await api.post("/upload", form, { headers });
      const data = res.data || {};
      console.log("upload response:", data);
      // optimistic update: if backend returned the uploaded file url, prepend it to the list
      if (data.url) {
        const newFile = {
          id: data.id || null,
          name: data.filename || data.public_id || file.name,
          url: data.url,
          size: data.bytes || file.size,
        };
        setFiles((prev) => {
          const next = [newFile, ...(prev || [])];
          console.log('files after optimistic update:', next);
          return next;
        });
      } else {
        // fallback: refresh from server
        await fetchFiles();
      }

      alert("Upload thành công");
    } catch (err) {
      console.error('Upload error:', err);
      if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Body:', err.response.data);
        alert(`Upload thất bại: ${err.response.status} ${JSON.stringify(err.response.data)}`);
      } else {
        alert(`Upload thất bại: ${err.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="upload-box">
        <div style={{ marginBottom: 12 }}>
          <input placeholder="Tìm file" value={q} onChange={(e) => setQ(e.target.value)} />
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="size">Kích thước</option>
          </select>
        </div>
        <h2>Upload file</h2>
        <input type="file" onChange={upload} disabled={uploading} />
      </div>

      <div className="file-list">
        <h3>Files</h3>
        {files.length === 0 ? (
          <p>No files yet</p>
        ) : (
          <div className="cards">
            {files.map((f) => {
              const thumb = f.url && f.url.includes('/upload/') ? f.url.replace('/upload/', '/upload/w_200,h_200,c_fill/') : f.url;
              return (
                <div className="card" key={f.id || f.name}>
                  <div className="card-body">
                    {thumb ? <img src={thumb} alt={f.name} style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 8 }} /> : null}
                    <a href={f.url} target="_blank" rel="noreferrer">
                      {f.name}
                    </a>
                    <div className="meta">{(f.size / 1024).toFixed(1)} KB</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
