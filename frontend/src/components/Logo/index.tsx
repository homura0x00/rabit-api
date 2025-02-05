import React from 'react';
// TODO 平台Logo 未设计完成
const LogoView: React.FC = () => {
  return (
    <>
      <div
        id="logo-view"
        style={{ display: 'flex',background: 'red',margin: 0, padding: 0, minWidth: '16px', height: '60%' }}
      >
        <div className="logo" style={{display: 'flex',fontSize: '1rem', color: 'blue' }}>
          RabitAPI
        </div>
        <div className="text" style={{color: 'gray'}}>开放平台</div>
      </div>
    </>
  );
};

export default LogoView;
