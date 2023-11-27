import { Spin } from 'antd';

function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , position:'fixed', top:0, left:0, right:0, background:'rgba(255, 255, 255, 0.541)'}}>
            <Spin size="large" />
        </div>
    );
}

export default Loading;