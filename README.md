# libmanage-client

<br/><br/>

## 서비스 소개
**libmanage**는 사용자의 스팀 라이브러리에 있는 게임의 메타 정보를 PC, 모바일 등 다양한 디바이스에서 설치할 수 있는 앱 형태로 제공하는 애플리케이션입니다.

**libmanage-client**는 **libmanage** 애플리케이션의 프론트엔드 프로젝트입니다.

<br/><br/>

## 목차
* 기획 배경 및 상세 소개
* 프로젝트 구조
* 기능 명세 및 상세 화면
* 기술 스택
* 기술적 고민

<br/><br/>

## 기획 배경 및 상세 소개
* 프론트엔드 역량 향상을 위해 연습할 때보다 대규모의 프로젝트를 진행하는 한편, 관심 있던 기술을 구현해보며 지난 프로젝트들과 차별점을 두는 것을 목표로 삼았습니다.

* 웹 앱의 기본적인 작동 방식에 대한 이해를 쌓기 위해 백엔드 서버를 직접 구현해보는 한편, MySQL을 활용해 DB 구축 및 CRUD 실습을 진행했습니다.

<br/><br/>

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

<br/><br/>

## 기능 명세 및 상세 화면
<details>
<summary>기능 명세 및 상세 화면</summary>

<br/>

<details>
<summary>1. 기본 화면</summary>
<div markdown="1">

![main](https://user-images.githubusercontent.com/20578093/163828641-81572288-f474-43b1-8184-66774b385769.png)

</div>
</details>

<br/>

<details>
<summary>2. 로그인</summary>
<div markdown="1">

* DB 데이터와의 대조를 통한 **로그인** 기능
* 임의의 사용자 정보 생성을 통한 **게스트 로그인** 기능
* 로그인 없이 사용할 수 있는 **오프라인으로 접속** 기능
![libmng-login](https://user-images.githubusercontent.com/20578093/163829017-557eb190-c4a7-4fa2-b5dc-66a9455ff2e4.png)

</div>
</details>

<br/>

<details>
<summary>3. 사용자 정보 관리</summary>

<br/>

<details>
<summary>3-1. 회원가입</summary>
<div markdown="1">

![libmng-reg](https://user-images.githubusercontent.com/20578093/163829174-f951975e-9c38-415f-bbf6-3ba2ee7c3f2d.png)

</div>
</details>

<br/>

<details>
<summary>3-2. 아이디/비밀번호 찾기</summary>
<div markdown="1">

* 3-2-1. 아이디 찾기
	![libmng_find_id](https://user-images.githubusercontent.com/20578093/163829466-3f33f88e-5f97-4b43-bf53-c4e77766d6cd.png)
* 3-2-2. 비밀번호 찾기
	![libmng_find_pwd](https://user-images.githubusercontent.com/20578093/163829516-16e6ca66-2ab2-474a-90c7-247ed92c307f.png)
* 3-2-3. 경우별 예시
	![libmng_find_ex](https://user-images.githubusercontent.com/20578093/163829567-8fd3c940-013e-4bfe-b4e5-a226d1bbe8dd.png)

	<details>
	<summary>3-2-4. 비밀번호 재설정</summary>
	<div markdown="1">

	* 사용자 요청별 토큰 기반으로 비밀번호 재설정 링크 제공
	* 토큰이 유효할 경우
		![libmng_token_valid](https://user-images.githubusercontent.com/20578093/163829755-41dc4186-f260-472c-b191-0e2d4d0d942a.png)
	* 토큰이 만료된 경우
		![libmng_token_expired](https://user-images.githubusercontent.com/20578093/163829848-653acec0-26a4-43e5-afc8-983877fcbc7a.png)
	* 올바르지 않은 토큰을 사용할 경우
		![libmng_token_invalid](https://user-images.githubusercontent.com/20578093/163829790-21496226-0e26-40a8-969f-016c6dbc1729.png)
	* 오류가 발생한 경우
		![libmng_token_err](https://user-images.githubusercontent.com/20578093/163829843-149dc5fe-b619-47ef-845d-ac59bb0dd2c5.png)

	</div>
	</details>

<br/>

</div>
</details>

<br/>

<details>
<summary>3-3. 회원정보 수정</summary>
<div markdown="1">

* 기능 이용 방법
	![libmng_meminfo_howto](https://user-images.githubusercontent.com/20578093/163830117-4e61e00d-da2f-4aa9-a92b-3717e37a49f8.png)
* 기능 상세
	![libmng_meminfo_mod](https://user-images.githubusercontent.com/20578093/163830125-c9eab841-7c70-4df3-a7d6-d98bf7be7093.png)

</div>
</details>

<br/>

<details>
<summary>3-4. 회원 탈퇴</summary>
<div markdown="1">

* 기능 이용 방법
	![libmng_meminfo_howto](https://user-images.githubusercontent.com/20578093/163830117-4e61e00d-da2f-4aa9-a92b-3717e37a49f8.png)
* 기능 상세
	![libmng_meminfo_out](https://user-images.githubusercontent.com/20578093/163830128-98d72746-8bd3-44e8-8e8c-518a94f2876a.png)

</div>
</details>

</details>

<br/>

<details>
<summary>4. 사용자 라이브러리 관리</summary>

<br/>

<details>
<summary>4-1. 사용자의 스팀 로그인을 통한 라이브러리 정보 등록</summary>
<div markdown="1">

1. 라이브러리를 등록할 스토어(스팀)에 로그인
	![libmng_process](https://user-images.githubusercontent.com/20578093/163830499-1c70cecd-24e9-4f9a-84ef-c6cbc3af423a.png)
2. 백엔드 서버를 통해 보유 게임의 메타데이터 검색 후 DB에 저장
	* 프론트엔드 영역은 Websocket 연결을 통해 진행 상황 정보를 백엔드 서버로부터 수령, 표시
	<details>
	<summary>상태 메시지 일람</summary>
	<div markdown="1">

	1. 보유 중인 라이브러리를 IGDB 서비스에 검색 중입니다.
		* 사용자 라이브러리에 저장된 콘텐츠(= 게임)의 제목을 기반으로 [igdb.com](https://www.igdb.com/) 데이터 검색
		![libmng_search](https://user-images.githubusercontent.com/20578093/163830505-d85aeabd-55b3-4b0e-8771-0a226d4380ff.png)
	2. IGDB 서비스로부터 메타데이터를 수신하는 중입니다. (n 회차 / 전체 m 회)
		* 애플리케이션 배포 플랫폼인 Heroku 설정으로 인해 요청 하나의 길이가 30초를 초과할 경우 강제로 접속 종료가 발생함
			* 테스트 환경에서 25개를 초과하는 아이템에 대해 검색 + 데이터 정렬을 위한 가공 + DB 저장까지 진행했을 때 연결 종료가 발생해 25개 단위로 요청
			* 테스트 환경: 와이파이 환경(5GHz 대역, 공유기까지 약 8m 거리)
		![libmng_get_meta](https://user-images.githubusercontent.com/20578093/163830487-9739134b-980a-4e06-b718-16f5e8e0da7f.png)
	3. 수신한 메타데이터를 가공하는 중입니다.
		* 검색한 메타데이터를 리스트 표시를 위한 형태로 가공
		<details>
		<summary>테이블 구조</summary>
		<div markdown="1">

		* libid: 테이블 내 번호
		* title: 콘텐츠 제목 - 텍스트 리스트 표시용
		* cover: 콘텐츠 섬네일 - 섬네일 리스트 표시용
		* igdb_url: 메타데이터 사이트상 해당 콘텐츠의 검색 결과 url
		* processed: 아래 meta 항목이 igdb 사이트에서 막 검색된 상태인지, libmanage 앱에서 표시를 위해 가공된 상태인지 표시
		* meta: 콘텐츠를 메타데이터 사이트에 검색했을 때 받을 수 있는 데이터
			* igdb의 경우 해당 사이트 고유의 id로 값이 제공되므로, libmanage 앱에서의 표시를 위해 추가 가공이 필요
			<details>
			<summary>미가공 상태 예시</summary>
			<div markdown="1">

			* number 값, string 값, number 형태의 추가 검색이 필요한 id가 혼재된 상태
			```
			{
				"id":42,
				"age_ratings":[3193],
				"aggregated_rating":80,
				"aggregated_rating_count":4,
				"alternative_names":[20708,69677,69678,69679],
				"bundles":[46712,52883],
				"category":0,
				"collection":9,
				"cover":86954,
				"created_at":1297808346,
				"external_games":[14911,62326,76954,148020,247081],
				"first_release_date":1070323200,
				"follows":24,
				"game_engines":[6],
				"game_modes":[1],
				"genres":[5,12],
				"involved_companies":[51,52],
				"keywords":[3,58,67,103,106,132,221,283,453,872,970,1026,1097,1098,1158,1219,1313,1322,1346,1423,1523,1527,2242,3061,3270,4035,4094,4134,4183,4187,4202,4250,4284,4304,4330,4345,4376,4391,4397,4420,4428,4432,4444,4446,4543,4571,4592,4594,4598,4611,4613,4619,4621,4624,4626,4634,4660,4662,4681,4712,4737,4770,4777,4832,4838,4850,4892,4896,4902,4918,4920,4980,4992,5029,5185,5197,5264,5272,5349,5350,5382,5426,5427,5479,5542,5544,5554,5578,5583,5595,5599,5697,5704,5760,5783,5799,5800,5812,5892,5963,6002,6005,6135,6250,6258,6260,6261,6352,6363,6374,6377,6378,6391,6397,6400,6428,6478,6589,6619,6621,6624,6630,6737,6767,7021,7038,7353,7476,7498,7582,7593,7670,8101,8262,8792,8806,8969,8996,9003,9083,9291,9306,9313,9376,9378,9382,9444,9653,10047,10048,10322,11067,11699,11810,12123,12195,12254,12279,12442,13114,13115,13117,16058],
				"name":"Deus Ex: Invisible War",
				"platforms":[6,11],
				"player_perspectives":[1],
				"rating":63.0240945538585,
				"rating_count":83,
				"release_dates":[17,14215],
				"screenshots":[418,419,420,421,422],
				"similar_games":[41,43,2031,3042,5647,9498,9727,11270,19441,19531],
				"slug":"deus-ex-invisible-war",
				"summary":"Several religious and political factions see an opportunity to re-shape a worldwide government to their agendas. In this techno-nightmare, take part in the dark struggle to raise the world from its own ashes.\n\nThis dynamic and innovative 1st person-action/adventure brings a level of reality unprecedented in a videogame. Biotech modifications allow players to see through walls, leap 40 feet into the air, regenerate critical body damage or render yourself radar invisible. Globe-hop to real world locations such as Seattle, Antarctica, and Cairo.",
				"tags":[1,18,268435461,268435468,536870915,536870970,536870979,536871015,536871018,536871044,536871133,536871195,536871365,536871784,536871882,536871938,536872009,536872010,536872070,536872131,536872225,536872234,536872258,536872335,536872435,536872439,536873154,536873973,536874182,536874947,536875006,536875046,536875095,536875099,536875114,536875162,536875196,536875216,536875242,536875257,536875288,536875303,536875309,536875332,536875340,536875344,536875356,536875358,536875455,536875483,536875504,536875506,536875510,536875523,536875525,536875531,536875533,536875536,536875538,536875546,536875572,536875574,536875593,536875624,536875649,536875682,536875689,536875744,536875750,536875762,536875804,536875808,536875814,536875830,536875832,536875892,536875904,536875941,536876097,536876109,536876176,536876184,536876261,536876262,536876294,536876338,536876339,536876391,536876454,536876456,536876466,536876490,536876495,536876507,536876511,536876609,536876616,536876672,536876695,536876711,536876712,536876724,536876804,536876875,536876914,536876917,536877047,536877162,536877170,536877172,536877173,536877264,536877275,536877286,536877289,536877290,536877303,536877309,536877312,536877340,536877390,536877501,536877531,536877533,536877536,536877542,536877649,536877679,536877933,536877950,536878265,536878388,536878410,536878494,536878505,536878582,536879013,536879174,536879704,536879718,536879881,536879908,536879915,536879995,536880203,536880218,536880225,536880288,536880290,536880294,536880356,536880565,536880959,536880960,536881234,536881979,536882611,536882722,536883035,536883107,536883166,536883191,536883354,536884026,536884027,536884029,536886970],
				"themes":[1,18],
				"total_rating":71.51204727692925,
				"total_rating_count":87,
				"updated_at":1635246352,
				"url":"https://www.igdb.com/games/deus-ex-invisible-war",
				"videos":[10],
				"websites":[40860,40861,118817,127466,127467],
				"checksum":"c5d279b8-a8d6-ed33-c612-69f87661f8be"
			}
			```

			</div>
			</details>
			<details>
			<summary>가공 상태 예시</summary>
			<div markdown="1">

			* 표시할 데이터만 추출한 후 개별적인 검색 요청을 통해 유의미한 값을 수령하는 방식으로 가공 진행
			```
			{
				"artworks":["ars1d"],
				"covers":["co1vok"],
				"collections":["Batman: Arkham"],
				"genres":["Hack and slash/Beat ''em up","Adventure"],
				"game_videos":["T8bu2Y_cZb8"],
				"game_modes":["Single player"],
				"player_perspectives":["Third person"],
				"franchises":["Batman"],
				"release_dates":[{"id":208307,"human":"Mar 26, 2010","platform":6,"platform_name":"PC (Microsoft Windows)"},{"id":208308,"human":"May 11, 2010","platform":9,"platform_name":"PlayStation 3"},{"id":208309,"human":"May 11, 2010","platform":12,"platform_name":"Xbox 360"},{"id":208310,"human":"Nov 03, 2011","platform":14,"platform_name":"Mac"},{"id":208311,"human":"Mar 26, 2010","platform":9,"platform_name":"PlayStation 3"},{"id":208312,"human":"Mar 26, 2010","platform":12,"platform_name":"Xbox 360"}],
				"platforms":["PC (Microsoft Windows)","PlayStation 3","Xbox 360","Mac"],
				"themes":["Action","Horror","Stealth"],
				"age_ratings":[{"id":29694,"category":1,"rating":10},{"id":29695,"category":2,"rating":3}],
				"screenshots":["giqxuveuvxoc9e8zwh64","ppduuwevxcv7ttbs6pwy","ks88mlsjpk5ggdniz4sw","m5cbxh6yq3cobpe6dord","uqtqx7bajgm51ld0sjxg"],
				"involved_companies":[{"id":51849,"company":50,"developer":false,"publisher":true,"company_name":"WB Games"},{"id":106800,"company":164,"developer":true,"publisher":false,"company_name":"Rocksteady Studios"},{"id":106801,"company":4,"developer":false,"publisher":true,"company_name":"Eidos Interactive"},{"id":106802,"company":23,"developer":false,"publisher":false,"company_name":"Feral Interactive"},{"id":106803,"company":165,"developer":false,"publisher":true,"company_name":"DC Entertainment"}],
				"websites":[{"id":40018,"category":13,"url":"https://store.steampowered.com/app/35140"},{"id":120154,"category":16,"url":"https://www.epicgames.com/store/en-US/product/batman-arkham-asylum/home"},{"id":150964,"category":1,"url":"http://rocksteadyltd.com/#arkham-asylum"},{"id":150965,"category":6,"url":"https://www.twitch.tv/rocksteady"},{"id":150966,"category":9,"url":"https://www.youtube.com/user/BatmanArkhamCity"},{"id":150967,"category":4,"url":"https://www.facebook.com/BatmanArkhamUK"},{"id":150968,"category":5,"url":"https://twitter.com/batmanarkham"},{"id":150969,"category":8,"url":"https://www.instagram.com/batmanarkham"},{"id":150970,"category":14,"url":"https://www.reddit.com/r/BatmanArkham"},{"id":150971,"category":2,"url":"https://batman.fandom.com/wiki/Batman:_Arkham_Asylum"}],
				"name":"Batman: Arkham Asylum - Game of the Year Edition",
				"summary":"Critically acclaimed Batman: Arkham Asylum returns with a remastered Game of the Year Edition, featuring 4 extra Challenge Maps. The additional Challenge Maps are Crime Alley; Scarecrow Nightmare; Totally Insane and Nocturnal Hunter (both from the Insane Night Map Pack). \n- Utilize the unique FreeFlow™ combat system to chain together unlimited combos seamlessly and battle with huge groups of The Joker’s henchmen in brutal melee brawls \n- Investigate as Batman, the WORLD’S GREATEST DETECTIVE, by solving intricate puzzles with the help of cutting edge forensic tools including x-ray scanning, fingerprint scans, ‘Amido Black’ spray and a pheromone tracker \n- Face off against Gotham’s greatest villains including The Joker, HARLEY QUINN, POISON IVY and KILLER CROC \n- Become the Invisible Predator™ with Batman’s fear takedowns and unique vantage point system to move without being seen and hunt enemies \n- Choose multiple takedown methods, including swooping from the sky and smashing through walls. \n- Explore every inch of Arkham Asylum and roam freely on the infamous island, presented for the first time ever in its gritty and realistic entirety \n- Experience what it’s like to be BATMAN using BATARANGS, explosive gel aerosol, The Batclaw, sonar resonator and the line launcher \n- Unlock more secrets by completing hidden challenges in the world and develop and customize equipment by earning experience points \n- Enjoy complete superhero freedom in the environment with the use of Batman’s grapnel gun to get to any place you can see, jump from any height and glide in any direction",
				"totalRating":89.39922440890159
			}
			```

			</div>
			</details>
		```
		+--------------+-------------+------+-----+---------+----------------+
		| Field        | Type        | Null | Key | Default | Extra          |
		+--------------+-------------+------+-----+---------+----------------+
		| libid        | int(11)     | No   | PRI | NULL    | auto_increment |
		| title        | text        | No   |     | NULL    |                |
		| cover        | text        | Yes  |     | NULL    |                |
		| igdb_url     | text        | No   |     | NULL    |                |
		| processed    | char(5)     | No   |     | NULL    |                |
		| meta         | text        | No   |     | NULL    |                |
		+--------------+-------------+------+-----+---------+----------------+
		```

		</div>
		</details>

		![libmng_proc_meta](https://user-images.githubusercontent.com/20578093/163830494-c5dbc240-6556-4066-af5b-a940d8720ed5.png)

	4. 메타데이터의 저장이 완료됐습니다.
		* 사용자 라이브러리에 등록된 모든 아이템의 메타데이터를 검색, 가공한 후 DB에 저장까지 마친 상태
		![libmng_save_done](https://user-images.githubusercontent.com/20578093/163830503-48aeebef-6628-4353-8eeb-828c09cb474b.png)

	</div>
	</details>

</div>
</details>

<br/>

<details>
<summary>4-2. 카테고리 관리</summary>
<div markdown="1">

* 원하는 목록만 표시
	![libmng_cat_filter](https://user-images.githubusercontent.com/20578093/163830869-b42cde91-d194-4aac-adac-e4ac38e088ae.png)
	<details>
	<summary>카테고리 목록 정렬 기능</summary>
	<div markdown="1">

	![libmng_cat_reorder](https://user-images.githubusercontent.com/20578093/163830872-9c752e63-1389-4f14-bb0d-28bddbc67bac.png)

	</div>
	<details>
	<summary>기능 시연</summary>
	<div markdown="1">

	![libmng_cat_reorder_demo](https://user-images.githubusercontent.com/20578093/163830853-009708fb-8d2a-47a0-85b9-a004258072e4.gif)

	</div>
	</details>
	</details>

</div>
</details>

<br/>

<details>
<summary>4-3. 라이브러리 텍스트/섬네일 표시</summary>
<div markdown="1">

* 텍스트 리스트
	![libmng_txt_list](https://user-images.githubusercontent.com/20578093/163831234-c6c5c7cd-1110-4320-91d8-fc902c7f15eb.png)
* 섬네일 리스트
	![libmng_thumbs_list](https://user-images.githubusercontent.com/20578093/163831228-8ac92217-054c-477d-87ce-584e7c5d18b6.png)

	<details>
	<summary>섬네일 크기 조정 시연</summary>
	<div markdown="1">

	![libmng_thumbs_resize_demo](https://user-images.githubusercontent.com/20578093/163831207-345f157e-55e6-4083-98ca-630a9743dd63.gif)

	</div>
	</details>

</div>
</details>

<br/>

<details>
<summary>4-4. 라이브러리 필터링 기능</summary>

<br/>

<details>
<summary>4-4-1. 카테고리/스토어 단위 필터 시연</summary>
<div markdown="1">

* 기본 State: `all`
	* all 버튼을 누를 경우 목록 제거/표시 전환
* 개별 스토어 클릭(= 클릭 1회) → state를 해당 스토어(steam)로 변경
	* 스토어 버튼 2회째 클릭: 목록 제거
	* 스토어 버튼 3회째 클릭: 목록 표시
![libmng_lib_store_filter](https://user-images.githubusercontent.com/20578093/163831420-c344438a-ee53-4ec8-8e1c-e59c3f55c7ce.gif)

</div>
</details>

<br/>

<details>
<summary>4-4-2. 라이브러리 내 필터 시연</summary>
<div markdown="1">

* `Array.prototype.filter()`를 사용해 표시 아이템 필터링
![libmng_lib_txt_filter](https://user-images.githubusercontent.com/20578093/163831428-57ad0cce-219b-4cc2-ad26-0b9610ea4181.gif)

</div>
</details>
</details>

<br/>

<details>
<summary>4-5. 라이브러리 열람</summary>
<div markdown="1">

* 사용자 라이브러리 중 [igdb.com](https://www.igdb.com/) 등록 데이터 열람 기능
	<details>
	<summary>항목</summary>
	<div markdown="1">

	* 메타 점수
	* 연령 제한
	* 게임 소개
	* 게임 스크린샷 등 미디어
	* 상세 정보

	</div>
	</details>
* 열람 화면
	![libmng_meta_main](https://user-images.githubusercontent.com/20578093/163831575-851eb917-feae-4030-8507-75777fcc2659.png)
* 스크린샷 열람
	![libmng_meta_media](https://user-images.githubusercontent.com/20578093/163831592-aef56b52-e591-4eb9-ac92-7bc393062144.png)
* 기타 상세 정보 열람
	![libmng_meta_meta](https://user-images.githubusercontent.com/20578093/163831598-0c721549-37e2-48be-958d-ee8f82bee3bc.png)
</div>
</details>

</details>
</details>

<br/><br/>

## 기술 스택
* Front-End
	* React.js
      - 실력 향상을 위해 React.js를 사용하여 좀 더 규모가 큰 프로젝트를 진행하는 것을 목표로 삼았습니다.
      - 지난 프로젝트와 차별점을 두기 위해 다음과 같은 부분을 구현하는 데 집중했습니다.
          - 단순한 SPA에서 벗어나 PWA 형태를 선택했습니다. 설치가 가능한 앱 형태로 프로젝트를 만든다는 컨셉을 지키기 위해서입니다.
          - 지난 프로젝트에서 다루지 않았던 HTTP, Websocket 등을 사용한 통신을 구현했습니다.
	* Emotion.js
      - 전체 프로젝트에 걸쳐 스타일 작성 방법을 최대한 통일시키는 것을 목표로 삼았습니다.
          - `<button>`, `<input>` 등 유사한 스타일의 특정 요소를 반환하는 컴포넌트는 Emotion.js의 Styled Components를 통해 코드 재사용성을 높였습니다.
          - Emotion.js의 `css` Property를 통해 작성하는 코드는 컴포넌트 최상단 요소에서 스타일을 작성하는 등, 작성 방법을 통일하여 유지·보수성을 높이는 것에 집중했습니다.
	* TypeScript
    	* 타입스크립트 강의를 수강한 후, 좀 더 기능에 익숙해지기 위해 타입스크립트를 사용했습니다.

<br/><br/>

## 기술적 고민

<details>
<summary><span style="font-weight: bold;">1. 제3자 API 최적화</span></summary>
<div markdown="1">

  * **요약**
    - 데이터 로딩 속도를 높이기 위해 제3자 API 최적화 진행, 약 200개의 테스트 데이터를 한꺼번에 처리하는 대신 개별적으로 처리하도록 하여 데이터 표시 속도 40배 증가

  * **문제 상황**
    - 사용자의 Steam 보유 게임 목록을 검색해 받아온 메타 데이터를 사용자에게 표시하는 속도가 너무 느림
    - 설명
      - 메타 데이터는 `{"id":0000,"age_ratings":[344,43418 ... }`과 같은 형태(이하 **raw 형태**)로 제공되며, 이 중 사용자에게 표시할 데이터는 15가지임
      - 각각의 항목에 저장된 값은 api 제공 업체인 igdb.com에서 사용하는 값으로, 자세한 데이터 열람을 원할 경우 추가적인 요청이 필요함
        - 예를 들어 위 `age_ratings`의 `344`값이 무엇을 뜻하는지 알고 싶을 경우, `[요청 주소]/age_ratings`에 `344`값에 대한 검색 과정을 거쳐야 온전한 값을 얻을 수 있음
      - 테스트 환경(= 200개) 기준, raw 형태의 메타 데이터를 받아오는 시간 자체는 길지 않아 개별 쿼리 방식으로 DB에 저장함
      - 문제가 되는 부분은 DB에 저장된 raw 형태의 메타 데이터를 추가 요청으로 가공하는 과정을 거쳐 사용자에게 표시하는 부분임

  * **접근 방법 및 해결**
    * **원인 파악**: api가 한 번에 처리하는 데이터 수가 너무 적음
      - 메타 데이터 제공 서비스인 igdb.com의 api는 초당 4건의 요청만 처리할 수 있기 때문임
      - 해당 비율을 넘어갈 경우 429 오류가 반환되며 메타 데이터를 가공하는 절차가 종료됨
    * **1차 해결안**: 멀티 쿼리를 사용해 한 번에 받아오는 데이터양을 늘림
      - 멀티 쿼리는 igdb.com의 api가 제공하는 기능으로, 한 번에 다수의 요청을 처리하는 기능임
      - 멑리 쿼리를 사용하면 10개의 요청을 하나의 요청으로 처리할 수 있기 때문에, 초당 최대 40건의 요청을 처리할 수 있음
    * **2차 문제**: 요청 목록의 응답을 전부 받아오기 전에 다음 절차로 넘어가 버림
      - 원인: `forEach`, `setTimeout`을 조합해 쿼리를 보내는 방식으로 코드를 구현했었는데, 루프 종료 조건을 데이터 수령이 아니라 변수 `count`의 값으로 설정했기 때문
      - 개발 당시에는 코드 구조를 최대한 변경하지 않고 문제를 해결하는 것을 우선순위로 삼았기 때문에, 임시로 마지막 요청을 한 번 더 보내는 것으로 진행함
    * **2차 해결안**: `Promise.all(Settled)` → `forEach` + `setTimeout` 롤백
      - 각각의 쿼리는 `Promise`를 반환하므로, `Promise.all(Settled)`를 사용해 `response`를 한 번에 처리하고자 함
      - `Promise.all(Settled)` 적용 결과 목록의 첫 번째 항목의 데이터는 제대로 반환이 됐으나, 나머지 `response`는 값이 전부 `undefined`로 변하는 문제가 발생함
      - `forEach` 반복문 내부에서 `Promise.all(Settled)`를 사용했던 것이 원인으로 보임
      - 개발 당시 원인을 발견하지 못했고, 요청을 한 번 더 보내는 방식으로 요청이 누락되는 문제 자체는 해결됐기 때문에 `forEach` + `setTimeout`을 통한 개별 요청으로 롤백해 기능을 구현함
    * **3차 문제**: 200개 데이터 처리에 시간이 너무 오래 걸림
      - 원인: 약 200개의 게임의 메타 데이터를 구성하는 개별 항목들에 대한 쿼리를 개별적으로 시행
      - 전체 메타 데이터 수령에 20분 이상 소요됨
    * **3차 해결안**: 사용자가 특정 게임의 정보 열람을 위해 클릭할 때 데이터를 받아오도록 수정
      - 기존 방식
        - 전체 게임 목록 →
        raw 형태 메타 데이터 수령 →
        개별 데이터 쿼리 과정을 `forEach` + `setTimeout`을 사용해 개별적으로 진행
      - 개선 방식
        - 최초 열람 항목
          - 사용자가 특정 게임을 선택 →
          `forEach` + `setTimeout`으로 `Promise` 배열 생성 →
          `Promise.allSettled`로 한 번에 처리 →
          메타 데이터 가공 후 사용자에 표시
          - 가공된 데이터는 최초로 수령한 raw 형태 메타 데이터를 대신하여 DB에 저장
        - 중복 열람 항목
          - 최초 열람 시점에 가공 및 저장된 메타 데이터를 DB에서 불러와 표시
    * **개선 결과**
      - (최초 열람 항목) 메타 데이터 수령부터 표시까지 30초 소요되어 **약 40배**의 데이터 표시 속도 증가 효과

</div>
</details>

<details>
<summary><span style="font-weight: bold;">2. 카테고리 재배치 기능의 크로스 브라우징 문제 등 대응</span></summary>
<div markdown="1">

* **요약**
  - clone-react-dnd 프로젝트를 사용해 구현한 카테고리 재배치 기능이 브라우저 종류, 디바이스 종류에 따라 작동하지 않는 문제가 발생

* **문제 상황**
  1. Google Chrome, Mozilla Firefox에서 문제없이 작동하던 카테고리 재배치 기능이 Safari 브라우저에서 오류가 발생함
     	- 드래그 요소를 한 칸만 이동시켜도 목록의 끝으로 이동하는 현상이 발생함
  2. 카테고리 재배치 기능이 모바일 브라우저에서 작동하지 않는 문제를 확인함

* **접근 방법 및 해결**
  - 원인 파악
  	- **브라우저 호환 문제**
      - clone-react-dnd 라이브러리 구현 당시 `dragend` 이벤트를 사용해 드래그, 드롭 이벤트를 모두 `useDragClone` Hook에서 처리하려 한 것이 원인이 됨
      - Safari 브라우저에서 `dragend` 이벤트가 실제 커서가 이동한 거리를 반환하는 게 아니라 가상의 값을 반환하여 요소가 이동할 거리가 과도하게 책정되는 것이 원인이 됨
  	- **모바일 브라우저 미작동 문제**
      - 모바일 브라우저에서 드래그 앤 드롭 이벤트가 아예 작동하지 않았는데, 원인은 드래그 앤 드롭 이벤트에 존재하는 `dataTransfer` 객체가 터치 이벤트에 없기 때문으로 보임
  - 해결안
  	- **브라우저 호환 문제**
      - clone-react-dnd 프로젝트: 기존 `useDragClone` Hook에서 `dragend`로 처리하던 드롭 관련 판정을 `useDropClone` Hook에서 `drop`으로 처리하도록 수정
      - Library Manager 프로젝트: 변경된 라이브러리 사용 방법에 맞춰 카테고리 재배치 로직을 일부 수정
  	- **모바일 브라우저 미작동 문제**
			- 터치 이벤트로 드래그 앤 드롭과 유사한 효과를 구현함
        - `touchstart` 이벤트에서 드래그 대상을 복제해 드래그 대상의 이동 경로를 표현할 대상으로 삼음
        - `touchmove` 이벤트에서 복제한 드래그 요소의 이동 경로 표현, 드롭할 좌표 저장, 드롭할 위치 표시의 기능을 수행함
        - `touchend` 이벤트에서 실제 드래그 대상의 위치를 재배치함

* **적용 결과**
  - 데스크톱 환경 기준 Google Chrome, Mozilla Firefox, Safari 브라우저에서 카테고리 재배치 기능이 모두 정상적으로 작동함
  - 모바일 브라우저에서 카테고리 재배치 기능이 정상적으로 작동함

</div>
</details>
