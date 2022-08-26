import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import XLSX from 'xlsx';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from 'custom_modules/address';
import { sizes, flex, border } from 'styles';
import signin from 'assets/sits_large_noborder.png';
import FormSubmit from 'components/Forms/FormSubmit';
import { StyleSet } from 'custom_modules/commonUtils';
import { headerModalStyles, offlineHeaderModalStyle } from '../../../styles/modals/ModalContentsStyles';

const ModalHeaderOption = ({ props }: any) => {
  const [uploadedData, setUploadedData] = useState<any | any[]>('');
  const [currTabState] = useState('import');
  const {
    userState,
    dispatch,
    comparisonStateCreator,
    modalStateCreator,
    setUserLibrary,
    selectedItemDataCreator,
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
          ${headerModalStyles({ sizes, flex } as StyleSet, condition)}
          ${offlineHeaderModalStyle({sizes, flex, border} as StyleSet, currTabState)}
        `}
      >
        <h1>Offline</h1>
        <hr />
        <section id="offline-contents-wrapper">
          <section id="offline-form-wrapper">
            <form
              onSubmit={e => {
                e.preventDefault();
                const storeInfo: Record<string, string[]> = {};
                const libInfo: Record<string, string> = {};
                const category = (e.currentTarget[0] as HTMLInputElement).value;
                const storeName = (e.currentTarget[1] as HTMLInputElement).value;
                storeInfo[category] = [storeName];
                libInfo[storeName] = uploadedData;
                setStoresList(storeInfo);
                setUserLibrary(libInfo);
                dispatch(modalStateCreator(false));
              }}
            >
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
                  </select>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="store-name">
                    스토어
                  </label>
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
                      const { files } = e.target;
                      const uploadedFile = files![0];
                      if (typeof uploadedFile === 'undefined') return;
                      const reader = new FileReader();
                      reader.onload = (loadEvt => {
                        const sheetReader = XLSX.read(loadEvt.target!.result);
                        const { SheetNames, Sheets } = sheetReader;
                        const metaTable = Sheets[SheetNames[0]];
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
                        const libData: any[] = [];
                        processed.forEach((key: any) => {
                          const dataContainer: Record<string, string> = {};
                          dataTitleList.forEach((item, idx) => {
                            dataContainer[item] = dataList[idx][key];
                          });
                          libData.push(dataContainer);
                        });
                        setUploadedData(libData);
                      })
                      reader.readAsArrayBuffer(uploadedFile);
                    }}
                  />
                </div>
              </section>
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
    <article css={css`${headerModalStyles({ sizes, flex } as StyleSet, condition)}`}>
      <h1>스토어 목록</h1>
      <hr />
      <section className="store_container">
        <h2>Steam</h2>
        {
          condition
            ?
              (
                <a
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
                    const temp = {
                      ...userState,
                      stores: {
                        ...userState.stores,
                        game: {
                          ...userState.stores.game,
                          steam: false
                        }
                      }
                    };
                    axios
                      .post(
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
