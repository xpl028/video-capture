import { message } from 'antd';
import { useEffect } from 'react';
import './App.css';
import { dataUrlToFile } from './utils'

function App() {
  const input = document.createElement('input');
  input.type = 'file';
  input.hidden = true;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // 上传触发input的点击事件
  const onUploadVideo = () => {
    input.click();
  }

  function upload() {
    const video = document.getElementById('video');
    console.log(video);
    const file = this.files[0];

    if (file.type !== 'video/mp4') {
      message.error('请上传MP4格式的视频');
      return;
    }

    const url = window.URL.createObjectURL(file);

    video.src = url;
  }

  useEffect(() => {
    input.addEventListener('change', upload);

    return () => {
      input.removeEventListener('change', upload);
    }
  }, []);

  // 截取帧处理
  const onClick = () => {
    ctx.drawImage(video, 0, 0, video.height, video.width);

    // 获取base64
    const dataUrl = canvas.toDataURL('image/png');
    // base64转为文件对象
    const file = dataUrlToFile(dataUrl, '图片.png', 'image/png');
    console.log(file);
  }

  return (
    <div className="App">
      <video
        id="video"
        controls
        width={800}
        height={400}
        crossOrigin="anonymouns"
        // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
      />
      
      <div className="btnGroup">
        <button onClick={onUploadVideo}>上传视频</button>
        <button onClick={onClick}>点我截取</button>
      </div>
    </div>
  );
}

export default App;
