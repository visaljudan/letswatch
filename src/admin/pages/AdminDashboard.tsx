import AdminLayout from "../layout/AdminLayout";
import { useState } from "react";
import axios from "../../api/axios";

const AdminDashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [movieMessage, setMovieMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile);

    setLoading(true);
    setMovieMessage("");

    try {
      const response = await axios.post("/movie_videos", formData);
      const data = await response.data;

      if (!data.success) {
        setLoading(false);
        setMovieMessage(data.message);
        return;
      }

      setLoading(false);
      setMovieMessage("Movie uploaded successfully.");
    } catch (error) {
      console.log("Error:", error);
      setMovieMessage("An error occurred while uploading the video.");
    }
  };

  return (
    <AdminLayout>
      <div className="w-100">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            name="video"
            onChange={handleFileChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
        {movieMessage && <p>{movieMessage}</p>}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
