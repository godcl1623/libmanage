import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import XLSX from 'xlsx';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../../custom_modules/address';
import { sizes, flex, border } from '../../../../../styles';
import signin from '../../../../../assets/sits_large_noborder.png';
import { headerModalStyles, offlineHeaderModalStyle } from '../../../styles/modals/ModalContentsStyles';
import FormSubmit from '../../../../Auth/module/components/FormSubmit';

const MemoedSubmit = memo(FormSubmit);

const ModalHeaderOption = ({ props }) => {
  const [uploadedData, setUploadedData] = React.useState('');
  const [currTabState, setCurrTabState] = React.useState('import');
  const {
    userState,
    dispatch,
    comparisonStateCreator,
    modalStateCreator,
    setUserLibrary,
    selectedItemDataCreator,
    axios,
    caution,
    setStoresList
  } = props;

  const location = useLocation();

  const condition =
    userState.stores === undefined ||
    userState.stores.game === undefined ||
    userState.stores.game.steam === false;

  if (location.pathname === '/offline' || !navigator.onLine) {
    return (
      <article
        id="xlsx_menu"
        css={css`
          ${headerModalStyles({ sizes, flex }, condition)}
          ${offlineHeaderModalStyle({sizes, flex, border}, currTabState)}
        `}
      >
        <h1>Offline</h1>
        <hr />
        <section id="offline-contents-wrapper">
          {/* <section id="offline-tab-wrapper">
            <button
              onClick={e => {
                e.preventDefault();
                setCurrTabState('import');
              }}
            >불러오기</button>
            <button
              onClick={e => {
                e.preventDefault();
                setCurrTabState('export');
              }}
            >내보내기</button>
          </section> */}
          <section id="offline-form-wrapper">
            <form
              onSubmit={e => {
                e.preventDefault();
                const storeInfo = {};
                const libInfo = {};
                const category = e.target[0].value;
                const storeName = e.target[1].value;
                storeInfo[category] = [storeName];
                libInfo[storeName] = uploadedData;
                setStoresList(storeInfo);
                setUserLibrary(libInfo);
                dispatch(modalStateCreator(false));
              }}
            >
              {/* {
                currTabState === 'import'
                  ? */}
                    <section id="offline-import-wrapper">
                      <div className="input-wrapper">
                        <label htmlFor="content-type">
                          범주
                        </label>
                        <select
                          name="content-type"
                          id="new-category"
                        >
                          <option value=''>선택</option>
                          <option value="game">게임</option>
                          {/* <option value="music">음악</option>
                          <option value="series">드라마</option>
                          <option value="movie">영화</option> */}
                        </select>
                      </div>
                      <div className="input-wrapper">
                        <label htmlFor="store-name">
                          스토어
                        </label>
                        {/* <input
                          name="store-name"
                          type="text"
                        /> */}
                        <select
                          name="store-name"
                        >
                          <option value=''>선택</option>
                          <option value="steam">스팀</option>
                        </select>
                      </div>
                      <div className="input-wrapper">
                        <input
                          type="file"
                          id="upload_test"
                          onChange={e => {
                            // change 이벤트에서 업로드된 파일 객체만 추출
                            const { files } = e.target;
                            // 파일 객체에서 업로드된 파일만 추출
                            const uploadedFile = files[0];
                            if (typeof uploadedFile === 'undefined') return;
                            // 파일을 읽기 위한 메서드 초기화
                            const reader = new FileReader();
                            // // 파일이 성공적으로 로드됐을 때의 동작
                            reader.onload = (loadEvt => {
                              const sheetReader = XLSX.read(loadEvt.target.result);
                              const { SheetNames, Sheets } = sheetReader;
                              const metaTable = Sheets[SheetNames];
                              const totalKeys = Object.keys(metaTable);
                              const processed = totalKeys
                                .slice(1, totalKeys.length - 1)
                                .filter(key => key[0] === 'E')
                                .slice(1, totalKeys.length - 1)
                                .map((key, idx) => metaTable[key].v !== '0' ? idx : '')
                                .filter(filtered => filtered !== '');
                              const titles = totalKeys
                                .slice(1, totalKeys.length - 1)
                                .filter(key => key[0] === 'B')
                                .slice(1, totalKeys.length - 1)
                                .map(key => metaTable[key].v);
                              const covers = totalKeys
                              .slice(1, totalKeys.length - 1)
                              .filter(key => key[0] === 'C')
                              .slice(1, totalKeys.length - 1)
                              .map(key => metaTable[key].v);
                              const metas = totalKeys
                              .slice(1, totalKeys.length - 1)
                              .filter(key => key[0] === 'F')
                              .slice(1, totalKeys.length - 1)
                              .map(key => metaTable[key].v);
                              const dataTitleList = ['titles', 'covers', 'metas'];
                              const dataList = [titles, covers, metas];
                              const libData = [];
                              processed.forEach(key => {
                                const dataContainer = {};
                                dataTitleList.forEach((item, idx) => {
                                  dataContainer[item] = dataList[idx][key];
                                });
                                libData.push(dataContainer);
                              });
                              /* MakeList 손본 다음에 활성화할 것 */
                              // setUserLibrary(libData);
                              setUploadedData(libData);
                            })
                            // // 파일 로드 후의 동작을 수행하기 위한 조건(?)
                            // reader.readAsText(uploadedFile);
                            reader.readAsArrayBuffer(uploadedFile);
                          }}
                        />
                      </div>
                    </section>
                  {/* :
                    <section id="offline-export-wrapper">
                      <button>파일로 내보내기</button>
                    </section>
              } */}
              <div className="submit-wrapper">
                <FormSubmit />
              </div>
            </form>
          </section>
        </section>
      </article>
    );
  }

  return (
    <article css={css`${headerModalStyles({ sizes, flex }, condition)}`}>
      <h1>스토어 목록</h1>
      <hr />
      <section className="store_container">
        <h2>Steam</h2>
        {
          condition
            ?
              (
                <a
                  // href="http://localhost:3001/auth/steam"
                  href={`https://${sendTo}/auth/steam`}
                >
                  <img
                    src={signin}
                    alt="sign_in_through_steam"
                    title="sign_in_through_steam"
                  />
                </a>
              )
            :
              (
                <button
                  onClick={e => {
                    const temp = userState;
                    temp.stores.game.steam = false;
                    // 반영을 위해서는 comparisonState 변경이 필요
                    axios
                      .post(
                        // 'http://localhost:3001/disconnect',
                        `https://${sendTo}/disconnect`,
                        { reqUserInfo: JSON.stringify(temp) },
                        { withCredentials: true }
                      )
                      .then(res => {
                        if (res) {
                          dispatch(modalStateCreator(false));
                          setUserLibrary('');
                          dispatch(selectedItemDataCreator({}));
                          dispatch(comparisonStateCreator(temp));
                        }
                      });
                  }}
                >
                  연동 해제
                </button>
              )
        }
      </section>
      {caution}
    </article>
  );
};

export default ModalHeaderOption;
