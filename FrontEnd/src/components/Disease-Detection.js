import React, { useState } from "react";
import "./DiseaseDetection.css";

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState();
  const [fname, setFname] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prevention, setPrevention] = useState("");
  const [image_url, setImage_url] = useState("");
  const [pred, setPred] = useState(0);
  const [sname, setSname] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setFname(event.target.files[0].name);
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData2 = new FormData();
    formData2.append("file", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formData2,
    };

    fetch("http://127.0.0.1:5000/detectDisease", requestOptions)
      .then((response) => response.json())
      .then(function (response) {
        let a = response;
        console.log(a);
        setLoading(true);
        setTitle(response.title);
        setDesc(response.desc);
        setPrevention(response.prevention);
        setImage_url(response.image_url);
        setPred(response.pred);
        setSname(response.sname);
      })
      .catch((err) => {
        setTitle(
          "Error occured!! Please check your connection or upload a valid image."
        );
      });
  };
  return (
    <div>
      {!isLoading ? (
        <>
          <center>
            <form onSubmit={handleSubmit}>
              <div className="upload-box">
                <input
                  type="file"
                  id="image"
                  onChange={changeHandler}
                  style={{ display: "none" }}
                />

                <label for="image">
                  <i class="fa-solid fa-cloud-arrow-up fa-xl"></i>
                </label>
              </div>
              <div className="image-box">
                <div className="image-preview">
                  <img src={file} alt=""/>
                  <p>{fname}</p>
                </div>

                <button type="submit" className="btn">
                  SUBMIT
                </button>
              </div>
            </form>
          </center>
        </>
      ) : (
        <div>
          <div className="container">
            <div className="disease-title">
              <h1>
                <b>{title}🍂</b>
              </h1>
            </div>
            <br />
            <div className="disease-image">
              <img src={image_url} className="disease-img" alt=""/>
            </div>

            <br />
            <div className="disease-box">
              <div className="disease-desc">
                <h5>
                  {pred === 3 ||
                  pred === 5 ||
                  pred === 7 ||
                  pred === 11 ||
                  pred === 15 ||
                  pred === 18 ||
                  pred === 20 ||
                  pred === 23 ||
                  pred === 24 ||
                  pred === 25 ||
                  pred === 28 ||
                  pred === 38 ? (
                    <b> Tips to Grow Healthy Plants :</b>
                  ) : (
                    <b>Brief Descritpion :</b>
                  )}
                </h5>
                <p className="paragraph">{desc}</p>
              </div>

              <div className="disease-prevention">
                <h5>
                  {pred === 3 ||
                  pred === 5 ||
                  pred === 7 ||
                  pred === 11 ||
                  pred === 15 ||
                  pred === 18 ||
                  pred === 20 ||
                  pred === 23 ||
                  pred === 24 ||
                  pred === 25 ||
                  pred === 28 ||
                  pred === 38 ? (
                    <b> Benefits :</b>
                  ) : (
                    <b>Prevent This Plant Disease By follow below steps :</b>
                  )}
                </h5>
                <p className="paragraph">{prevention}</p>
              </div>
            </div>

            <div className="supplement">
              {pred !== 4 ? (
                <>
                  <h5>
                    {pred === 3 ||
                    pred === 5 ||
                    pred === 7 ||
                    pred === 11 ||
                    pred === 15 ||
                    pred === 18 ||
                    pred === 20 ||
                    pred === 23 ||
                    pred === 24 ||
                    pred === 25 ||
                    pred === 28 ||
                    pred === 38 ? (
                      <b> Fertilizer :</b>
                    ) : (
                      <b>Supplements :</b>
                    )}
                  </h5>

                  <p className="paragraph">{sname}</p>
                </>
              ) : (
                <center></center>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
