import React from 'react';
import { useLocation } from 'react-router-dom';
import XLSX from 'xlsx';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../../custom_modules/address';
import { sizes, flex } from '../../../../../styles';
import signin from '../../../../../assets/sits_large_noborder.png';
import { headerModalStyles } from '../../../styles/modals/ModalContentsStyles';


const ModalHeaderOption = ({ props }) => {
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

  React.useEffect(() => {

  }, []);

  if (location.pathname === '/offline' || !navigator.onLine) {
    return (
      <article id="xlsx_test" css={css`${headerModalStyles({ sizes, flex }, condition)}`}>
        <h1>Offline</h1>
        <hr />
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
              const libData = {};
              dataTitleList.forEach((data, idx) => {
                libData[data] = [];
                processed.forEach(key => {
                  libData[data].push(dataList[idx][key]);
                });
              });
              /* MakeList 손본 다음에 활성화할 것 */
              // setUserLibrary(libData);
            })
            // // 파일 로드 후의 동작을 수행하기 위한 조건(?)
            // reader.readAsText(uploadedFile);
            reader.readAsArrayBuffer(uploadedFile);
          }}
        />
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
