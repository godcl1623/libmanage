# libmanage-client

## 서비스 소개
*libmanage*는 사용자의 스팀 라이브러리에 있는 게임의 메타 정보를 PC, 모바일 등 다양한 디바이스에서 설치할 수 있는 앱 형태로 제공하는 애플리케이션입니다.

*libmanage-client*는 *libmanage* 애플리케이션의 프론트엔드 프로젝트입니다.

## 목차
* 기획 배경 및 상세 소개
* 프로젝트 구조
* 기능 명세 및 상세 화면
* 기술 스택

## 기획 배경 및 상세 소개
* 프론트엔드 역량 향상을 위해 연습할 때보다 대규모의 프로젝트를 진행하는 한편, 관심 있던 기술을 구현해보며 지난 프로젝트들과 차별점을 두는 것을 목표로 삼았습니다.

* 웹 앱의 기본적인 작동 방식에 대한 이해를 쌓기 위해 백엔드 서버를 직접 구현해보는 한편, MySQL을 활용해 DB 구축 및 CRUD 실습을 진행했습니다.

## 프로젝트 구조
```
├── app/
│   ├── Auth/
│   │   ├── Find.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Reset.tsx
│   │
│   ├── Main/
│   │   ├── Header.tsx
│   │   ├── Library.tsx
│   │   ├── Main.tsx
│   │   ├── Meta.tsx
│   │   ├── Navigation.tsx
│   │   └── Progress.tsx
│   │
│   ├── Member/
│   │   ├── CheckMemInfo.tsx
│   │   ├── DelMemInfo.tsx
│   │   └── ModMemInfo.tsx
│   │
│   ├── Modal/
│   │   ├── Balloon.tsx
│   │   └── Modal.tsx
│   │
```

## 기능 명세 및 상세 화면
<details>
<summary>기능 명세 및 상세 화면</summary>
<div markdown="1">
	테스트
</div>
</details>

## 기술 스택
* Front-End
	* React.js
	* Redux
		* redux-toolkit
	* Emotion.js
	* TypeScript
* Devops & Tools
	* Axios
	* 암호화 라이브러리
		* bcryptjs
		* crypto-js
		* hash.js
