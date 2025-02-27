// 프로젝트 아이템 타입
type Project = {
    id: number;
    title: string;
    videoUrl: string;
    thumbnail: string;
    aspectRatio: string;
  };
  
  // 감독 데이터 타입
  type Director = {
    id: string;
    name: string;
    bg: string;
    face: string;
    title: string;
    description: string;
    bgThumbnail: string;
    
    projects: Project[];
  };
  
  // 전체 데이터 타입
  type DirectorsData = {
    [key: string]: Director;
  };
  
  export const directorsData: DirectorsData = {
    insukkang: {
      id: 'insukkang',
      name: 'INSUK KANG',
      title: 'Beyond The Frame',
      face: '',
      description:
        '경계를 넘어서는 시각적 스토리텔링으로 유럽과 아시아를 잇는 디렉터. 독창적인 미학과 정교한 연출력으로 브랜드의 가치를 새롭게 정의합니다.',
      bg: 'https://player.vimeo.com/video/1035446953?background=1&badge=0&autopause=0&player_id=0&app_id=58479',
      bgThumbnail: '/82bg.png',
      
      projects: [
        {
          id: 1,
          title: '10 brands Paris fashion film',
          videoUrl:
            'https://player.vimeo.com/video/1035499391?h=c51f0d10ad&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/1.jpg',
          aspectRatio: '4:3'
        },
        {
          id: 2,
          title: 'Maison de Ines Paris fashion film',
          videoUrl:
            'https://player.vimeo.com/video/1035885060?h=8b79da5bda&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/2.jpg',
          aspectRatio: '16:9'
        },
        {
          id: 3,
          title: 'Barbara Paris fashion film',
          videoUrl:
            'https://player.vimeo.com/video/1035885474?h=8f39f17f0e&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/3.jpg',
          aspectRatio: '16:9'
        },
        {
          id: 4,
          title: 'Huit Paris fashion film',
          videoUrl:
            'https://player.vimeo.com/video/1035886274?h=84efa739b9&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/4.jpg',
          aspectRatio: '16:9'
        },
        {
          id: 5,
          title: 'Kim Solbi Paris exposition teaser',
          videoUrl:
            'https://player.vimeo.com/video/1035886303?h=5ffd34b434&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/5.jpg',
          aspectRatio: '16:9'
        },
        {
          id: 6,
          title: 'Han Jihee Paris exposition teaser',
          videoUrl:
            'https://player.vimeo.com/video/1035886358?h=107b412004&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/6.jpg',
          aspectRatio: '16:9'
        },
        {
          id: 7,
          title: 'Lee Chulsoo Paris exposition teaser',
          videoUrl:
            'https://player.vimeo.com/video/1035886399?h=d11786fd79&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/7.jpg',
          aspectRatio: '16:9'
        },
        {
          id: 8,
          title: '레트로 아카이브 YouTube',
          videoUrl:
            'https://player.vimeo.com/video/1035886446?h=249cc4eac9&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/8.jpg',
          aspectRatio: '16:9'
        },
        {
          id: 9,
          title: '월광 미술관 YouTube',
          videoUrl:
            'https://player.vimeo.com/video/1035886714?h=d6e98322f5&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/9.jpg',
          aspectRatio: '16:9'
        },
        {
          id: 10,
          title: 'ffeff studio Paris fashion film',
          videoUrl:
            'https://player.vimeo.com/video/1035887058?h=767f61ba22&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/10.jpg',
          aspectRatio: '16:9'
        },
        {
          id: 11,
          title: 'Zajakala paris fashion film',
          videoUrl:
            'https://player.vimeo.com/video/1035887359?h=66540d39ac&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/11.jpg',
          aspectRatio: '16:9'
        },
        {
          id: 12,
          title: 'Kpop dance contest in Paris teaser',
          videoUrl:
            'https://player.vimeo.com/video/1035887408?h=9743a1867c&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/inseokkangPFthumbnails/12.jpg',
          aspectRatio: '16:9'
        }
      ]
    },
    simkyuhwan: {
      id: 'simkyuhwan',
      name: 'KYUHWAN SIM',
      face: '/face/simkyuhwanPF.JPG',
      title: 'Beyond Emotion, Connected Through Story',
      description:
        '진정성 있는 이야기와 영상을 통해 사람의 마음을 움직이는 디렉터, 화면 속 작은 순간 마저 우리 삶의 큰 변화로 만듭니다.',
      bg: 'https://player.vimeo.com/video/1060465915?background=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
      bgThumbnail: '/simkyuhwanPFthumbnails/mainbg1.png',
      
      projects: [
        {
          id: 1,
          title: 'MV Teaser 켠오 - Different man',
          videoUrl:
            'https://player.vimeo.com/video/1060466686?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/1.png',
          aspectRatio: '16:9'
        },
        {
          id: 2,
          title: 'MV Teaser karacin jr - Get Up',
          videoUrl:
            'https://player.vimeo.com/video/1060466760?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/2.png',
          aspectRatio: '16:9'
        },
        {
          id: 3,
          title: 'MV Teaser 정준희 - Mirror',
          videoUrl:
            'https://player.vimeo.com/video/1060466831?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/3.png',
          aspectRatio: '16:9'
        },
        {
          id: 4,
          title: 'MV Teaser 재희 - Love Again',
          videoUrl:
            'https://player.vimeo.com/video/1060466890?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/4.png',
          aspectRatio: '16:9'
        },
        {
          id: 5,
          title: 'MV Teaser 한지연 - Fly High',
          videoUrl:
            'https://player.vimeo.com/video/1060466946?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/5.png',
          aspectRatio: '16:9'
        },
        {
          id: 6,
          title: 'MV Teaser 재희 - (BAD)',
          videoUrl:
            'https://player.vimeo.com/video/1060467001?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/6.png',
          aspectRatio: '16:9'
        },
        {
          id: 7,
          title: 'MV Teaser Amole - Sweet Summer Night',
          videoUrl:
            'https://player.vimeo.com/video/1060467045?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/7.png',
          aspectRatio: '16:9'
        },
        {
          id: 8,
          title: 'MV Teaser 윤의일 - 계절',
          videoUrl:
            'https://player.vimeo.com/video/1060467127?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/8.png',
          aspectRatio: '16:9'
        },
        {
          id: 9,
          title: 'MV Teaser karacin jr - candy',
          videoUrl:
            'https://player.vimeo.com/video/1060467187?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/9.png',
          aspectRatio: '16:9'
        },
        {
          id: 10,
          title: 'MV Teaser 한지연 - 처음이야',
          videoUrl:
            'https://player.vimeo.com/video/1060467415?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/10.png',
          aspectRatio: '16:9'
        },
        {
          id: 11,
          title: 'MV Teaser 재희 - 꽃잎',
          videoUrl:
            'https://player.vimeo.com/video/1060467520?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/11.png',
          aspectRatio: '16:9'
        },
        {
          id: 12,
          title: 'MV Teaser 한지연 - lonely',
          videoUrl:
            'https://player.vimeo.com/video/1060467600?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/12.png',
          aspectRatio: '16:9'
        },
        {
          id: 13,
          title: 'MV Teaser karacin jr - GLOW',
          videoUrl:
            'https://player.vimeo.com/video/1060467670?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/13.png',
          aspectRatio: '16:9'
        },
        {
          id: 14,
          title: 'MV Teaser 한지연 - Dreams Come True',
          videoUrl:
            'https://player.vimeo.com/video/1060467760?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/14.png',
          aspectRatio: '16:9'
        },
        {
          id: 15,
          title: 'MV Teaser 나예담 - hope',
          videoUrl:
            'https://player.vimeo.com/video/1060476303?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/15.png',
          aspectRatio: '16:9'
        },
        {
          id: 16,
          title: 'Youtube 웹예능 - kbs world 쇼핑의참견 글로벌 시크릿넘버 ep1',
          videoUrl: 'https://player.vimeo.com/video/1060920868?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/16.png',
          aspectRatio: '16:9'
        },
        {
          id: 17,
          title: 'yes24 인터뷰 - 백희나 작가',
          videoUrl: 'https://player.vimeo.com/video/1060921342?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/17.png',
          aspectRatio: '16:9'
        },
        {
          id: 18,
          title: 'yes24 인터뷰 - 영어강사 주아쌤',
          videoUrl: 'https://player.vimeo.com/video/1060921453?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/18.png',
          aspectRatio: '16:9'
        },
        {
          id: 19,
          title: 'Youtube 컨텐츠 - 캡틴락인디 EP.1 싱어송라이터 정우',
          videoUrl: 'https://player.vimeo.com/video/1060921631?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/19.png',
          aspectRatio: '16:9'
        },
        {
          id: 20,
          title: 'Youtube 컨텐츠 - 캡틴락인디 EP.6 위아더나잇 We Are The Night',
          videoUrl: 'https://player.vimeo.com/video/1060922812?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/20.png',
          aspectRatio: '16:9'
        },
        {
          id: 21,
          title: 'Youtube 컨텐츠 - 캡틴락인디 EP.7 죠니판도라 Johnny Pandora ジョニーパンドラ',
          videoUrl: 'https://player.vimeo.com/video/1060923545?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
          thumbnail: '/simkyuhwanPFthumbnails/21.png',
          aspectRatio: '16:9'
        }
        
        
      ]
    }
  
  
  };
  
  export type { Project, Director, DirectorsData };
  