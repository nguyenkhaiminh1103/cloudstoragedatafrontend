import api from "./api";

function Dashboard() {
  const upload = async (e) => {
    const form = new FormData();
    form.append("file", e.target.files[0]);

    await api.post("/upload", form);
    alert("Upload thành công");
  };

  return (
    <div>
      <h2>Upload file</h2>
      <input type="file" onChange={upload} />
    </div>
  );
}

export default Dashboard;
