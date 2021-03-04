export async function dataUrlToFile(dataUrl, fileName, fileType) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();

  return new File([blob], fileName, { type: fileType })
}