select * from route
left join detail
on route.route_id = detail.detail_route_id;

-- bookmark 테이블 초기화
truncate bookmark;

-- detail 테이블 초기화
truncate detail;

-- route 테이블 초기화
truncate route;

insert into route (route_city, route_day) values
('서울', '1박2일'),
('서울', '2박3일'),
('부산', '1박2일'),
('부산', '2박3일'),
('부산', '3박4일'),
('제주도','1박2일'),
('제주도','2박3일');

insert into detail(detail_route_id, detail_comment) values
(1, '홍대, 압구정, 강남'),
(2, '을지로, 강남, 강북여의도, 신촌'),
(3, '송도케이블카, 광안리'),
(4, '광안대교, 아쿠아리움, 깡통시장'),
(5, '남포동, 다대포, 송도 해운대, 청사포, 용궁사, 이기대, 광안대교, 센텀, 광안리'),
(6, '한담 해안산책로-월령리 선인장 마을-주상절리-동문시장'),
(7, '제주 민속촌박물관-천제연 폭포-중문 해수욕장-동문시장-국립 제주박물관');