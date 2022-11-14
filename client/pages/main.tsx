export default function Main() {
  return (
    <div className="bg-mono-bgSection">
      <h1 className="mg-logo">Logo</h1>
      <div>
        <button className="mg-header-profile"></button>
      </div>
      <div>
        <button className="mg-primary-button">기본 버튼</button>
        <button className="mg-secondary-button">보조 버튼</button>
      </div>
      <div>
        <button className="mg-negative-button-round">부정 버튼</button>
        <button className="mg-primary-button-round">긍정 버튼</button>
      </div>
      <div>
        <button className="mg-transparent-button-circle mg-icon-capture"></button>
        <button className="mg-secondary-button-circle mg-icon-sound-on"></button>
        <button className="mg-secondary-button-circle mg-icon-sound-off"></button>
        <button className="mg-secondary-button-circle mg-icon-share"></button>
      </div>
      <div>
        <button className="mg-secondary-button-line mg-icon-card-edit"></button>
        <button className="mg-secondary-button-line mg-icon-card-delete"></button>
        <button className="mg-secondary-button-line mg-icon-card-qr"></button>
        <button className="mg-secondary-button-line mg-icon-card-url"></button>
      </div>
      <div>
        <button className="flex items-center text-mono-textFooter">
          <p className="mr-1 mg-footer-github"></p>김민아
        </button>
      </div>
      <div>
        <label htmlFor="" className="mg-default-label">
          아이디
        </label>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          className="mg-default-input w-[360px]"
        />
      </div>
      <div className="flex flex-row col-span-1">
        <div className="mg-default-card"></div>
      </div>
    </div>
  );
}
