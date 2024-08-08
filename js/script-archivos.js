async function convertFile() {
  const fileInput = document.getElementById("fileInput");
  const outputFormat = document.getElementById("outputFormat").value;
  const status = document.getElementById("status");

  if (!fileInput.files.length) {
    status.textContent = "Por favor, selecciona un archivo.";
    return;
  }

  const file = fileInput.files[0];

  const apiKey = ""; // Reemplaza con tu API Key de CloudConvert
  const uploadUrl = "https://api.cloudconvert.com/v2/import/upload";
  const convertUrl = "https://api.cloudconvert.com/v2/convert";

  try {
    // Subir el archivo
    status.textContent = "Subiendo archivo...";

    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: file.name,
      }),
    });

    const uploadData = await uploadResponse.json();
    const uploadLink = uploadData.data.result.form.url;

    const formData = new FormData();
    formData.append("file", file);

    await fetch(uploadLink, {
      method: "POST",
      body: formData,
    });

    // Convertir el archivo
    status.textContent = "Convirtiendo archivo...";

    const convertResponse = await fetch(convertUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_format: file.name.split(".").pop(),
        output_format: outputFormat,
        input: "upload",
        file: uploadData.data.result.files[0].url,
      }),
    });

    const convertData = await convertResponse.json();
    const fileUrl = convertData.data.result.files[0].url;

    status.innerHTML = `<a href="${fileUrl}" download>Descargar archivo convertido</a>`;
  } catch (error) {
    console.error("Error:", error);
    status.textContent = "Hubo un error al convertir el archivo.";
  }
}
