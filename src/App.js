import { message } from 'antd';
import { useEffect, useState } from 'react';
import './App.css';
import { dataUrlToFile } from './utils'

function App() {
  // 首帧
  const [firstFrame, setFirstFrame] = useState('');
  // 截取帧列表
  const [canvasList, setCanvasList] = useState([]);
  const input = document.createElement('input');
  input.type = 'file';
  input.hidden = true;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // 上传触发input的点击事件
  const onUploadVideo = () => {
    input.click();
  }

  // 上传视频
  function upload() {
    const video = document.getElementById('video');
    const file = this.files[0];

    if (file.type !== 'video/mp4') {
      message.error('请上传MP4格式的视频');
      return;
    }

    const url = window.URL.createObjectURL(file);

    video.src = url;
  }

  // 首帧截取
  const captureFirstFrame = () => {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    ctx.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);

    setFirstFrame(canvas.toDataURL('image/png'))
  }

  useEffect(() => {
    const video = document.getElementById('video');
    
    input.addEventListener('change', upload);
    video.addEventListener('loadeddata', captureFirstFrame);

    return () => {
      input.removeEventListener('change', upload);
      video.addEventListener('loadeddata', captureFirstFrame);
    }
  }, []);

  // 截取帧处理
  const onClick = () => {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    ctx.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);

    // 上传到服务器步骤
    // 1、获取base64
    const dataUrl = canvas.toDataURL('image/png');
    setCanvasList([...canvasList, dataUrl]);
    
    // 2、base64转为文件对象
    const file = dataUrlToFile(dataUrl, '图片.png', 'image/png');
    // 3、转为Formdata数据
    const formData = new FormData();
    formData.append('Filedata', formData);
    // 4、发送请求
    // ...
  }

  return (
    <div className="App">
      <video
        id="video"
        controls
        width={600}
        height={300}
        crossOrigin="anonymouns"
        preload="auto"
        // autoPlay
        // muted
        // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
      />
      
      <div className="btnGroup">
        <button onClick={onUploadVideo}>上传视频</button>
        <button onClick={onClick}>点我截取</button>
      </div>
      <div>
        <img width={300} src={firstFrame} alt="" />
      </div>
      <div>
        {canvasList.map(item => <img width={300} src={item} key={item} alt="" />)}
      </div>
    </div>
  );
}

export default App;
