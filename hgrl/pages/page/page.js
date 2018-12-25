//import qqVideo from "../../utils/qqVideo.js"
const util = require('../../utils/util.js');
var bmap = require('../../libs/bmap-wx.js');
let okayapi = require('../../utils/okayapi.js');
const txvContext = requirePlugin("tencentvideo");
var wxMarkerData = [];
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
// 获取全局应用程序实例对象
var app = getApp();
const innerAudioContext = wx.createInnerAudioContext();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page",
  /**
   * 页面的初始数据
   */

  data: {
    current: 'huge',
    love: false,
    play: true,
    music: true,
    weather: true,
    message: true,
    year: new Date().getFullYear(), // 年份
    month: new Date().getMonth() + 1, // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()], // 月份字符串
    liuyan: '',
    weatherData: '',
    sugData: '',
    tip: '',
    ts: 0,
    tb: 0,
    tm: 0,
    tt: 0,
    music_on: false,
    music_playing: false,
    demo6_days_style: [],
    markers: [],
    weatherPic: '',
    latitude: '',
    longitude: '',
    place_info: '',
    placeData: {},
    tc_list: ['我喜欢你，能不能考虑一下做我女朋友？\n———brightX told pluszeroZ for the first time.(2017-12-24)','春风十里，五十里，一百里，体测八百米，海底两万里，\n德芙巧克力，可可布朗尼。香草味八喜，榴莲菠萝蜜。\n鸡汁土豆泥，芝士玉米粒，黄焖辣子鸡，碧玉金镶玉，红烧狮子头，黑椒牛里脊，香橙排骨糖醋鱼。\n不如你，全都不如你。————<知乎>','饺子🥟','PART-Ⅴ———\nNEW PIC','浮生若梦，若梦非梦。浮生何如？如梦之梦。', '忘掉自己 认清世界', '人生不是你随便就能写清楚的\n————《你好，之华》', '她喜不喜欢我的猫不重要，我的猫喜不喜欢她很重要', '只要你需要我，我就会出现在你身旁\n———哆啦A梦', '2015-02-08 第一次正式认识你了\n2017-09-17  第一次正式约你出来呢\n2018-09-09  你答应了做我女朋友鸭🤗', '孩子的梦想就是父母的梦想啊！\n———《Clannad》', '只要记住你的名字\n不管你在世界的哪个地方\n我一定会，去见你。\n———《你的名字》', '好了，过来抱抱\n———Nick🦊 to Judy🐰', '希望下辈子做一只掌上明珠\n———精致的猪猪女孩++0', '冰冻五花肉要切成薄薄的才好吃。\n———有毒boy-金正峰', '榴莲明明是闻着香吃着更香啊！———知乎共鸣', '胡歌先生，\n度过大难，将有大成，继续努力，终成大器\n———金庸', '俯首望去，看到自己的影子默默的躺在地上，它只拥有一种颜色，却让我看到久违的真实。', '我想只有在无知的年代里，人才会沉醉于瞬间的华彩，因为智慧的光芒往往是持续而朴素的。', '人生和戏是难以简单用一个‘如’字来划上等号的，戏中的一切因为短暂而可贵，也因为仓促而脆弱，这两年我越来越明白这个道理。但我的确真切地爱过，从这一刻到那一刻… 戏幕合上，台下鼓掌我落泪，人生落幕，世人落泪我鼓掌，等待，下一幕。', '这个人长得有点讨巧，似乎有那么点帅，当然这个“帅”也只是勉强冠之。原因有三：其一，喜欢笑。多情者今称之为“花”。花者不酷，不酷者颠，颠者无智，无智者残，残岂帅焉？其二，喜欢说。多语者今称之为“贫”。贫者不实，不实者浮，浮者无勇，无勇者虚，虚岂帅焉？其三，喜欢想。多思者今称之为“柔”。柔者不坚，不坚者愁，愁者无志，无志者庸，庸岂帅焉？', '当残酷的现实找到我的时候，我要面对和承受的只有支离破碎的一切。', '艺人是不是很像八戒呢？任何情绪脾气陋习都得戒，有时候观众只会看到一个气炸了的猪头，却永远不知道天蓬元帅受了多大的委屈。相反闹事的妖精却往往华丽登场，可惜火眼金睛的悟空只有一个，还老是被念紧箍咒。所以八戒还是收起钉耙，去高老庄吃馒头背媳妇吧！', '突发奇想半夜出去跑步，记忆中上一次已经是十多年前的事了，那时候一口气绕着虹口足球场跑了十几圈，今天绕公园跑，天黑思路特别清晰，但仍然想不明白，这么多年过去了，我怎么还在绕圈。', '如果说我们终有一天可以站到人生某一个高度的话，一定是因为背后难以计数的点滴努力和一次次败而不馁的执着前进。', '我从来没有想过有朝一日站在她旁边的那个人不是我。', '人活着不仅仅是为了生存，就像云在青天水在瓶。', '时间是一把尺。我们站在十年的两端，我丈量着岁月，你预测着未来。', '都说现在生活条件好了，每天都像在过节。对我而言，所谓年味，恰恰是平日里那淡淡的幸福。', '爱像一片宽阔的湖泊，拯救生命干枯的沙丘。相爱更像是致命邂逅，就让我不知天高地厚。', '花衣终会凋零，但愿余香，缠绕指间。', '我们，结成伴趟过天真。', '我想要在拾荒的旅程中找回自己，却无意中得到了一个重新审视自己的机会-----重塑的同事也在不断颠覆。人很多时候都在惯性中生活，没有办法也没有愿望去真正认识自己。车祸把我撞离了原本的轨道，让我能够以最真实的状态去寻找新的动力和方向。', '我笑夏蝉唱不完少年梦，他说街灯亮不过明日光。', '人生和戏是难以简单用一个‘如’字来划上等号的，戏中的一切因为短暂而可贵，也因为仓促而脆弱，这两年我越来越明白这个道理。但我的确真切地爱过，从这一刻到那一刻… 戏幕合上，台下鼓掌我落泪，人生落幕，世人落泪我鼓掌，等待，下一幕。', '“困”有两种含义，无论是生理上的疲劳还是境遇有多糟糕，在内心摆一个笑脸，总是能够扛过去。', '演员总是站在明处，面对黑暗。对着黑暗微笑，对着黑暗倾诉，对着黑暗恋爱，对着黑暗祈祷，眼睛适应了黑暗，所以看不清自己。', '逍遥之后，梅郎可待。', '上天赋予每个生命个体的时间非常有限，若我们不为自己的命运疾走，生命的痕迹就显得太短浅了。', '我相信在这个世界上有一种神秘的力量，它超越了一切，无法用科学去验证，无法用语言来描述，但在某些时候它会悄悄来到你的身边。', '在拥有的时候懂得珍惜就不会害怕失去，若失去了才知道珍惜，就算不上真正拥有', '有些病，不药而愈；有些人，不期而遇。', '如果皮囊难以修复，就用思想去填满它吧。', '小时候的我很简单，喜欢蹲在厕所躺在浴缸里唱歌，所以“胡乱唱歌”基本概括了我的童年。长大了的我还是简单，喜欢趴在计算机跟前咬文嚼字，于是“胡歌”变成了“古月哥欠”。'],
    pc_list: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546304358&di=360339fc28d96ad3e814456e5d6aca2a&imgtype=jpg&er=1&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1aaf22f795bb85f8b3cedece1a50121144e02c341202b3-qMUGrT_fw658','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545653683186&di=86c8329145b0d460a9d8c22ba37c8f55&imgtype=0&src=http%3A%2F%2Fwx3.sinaimg.cn%2Fmw690%2F7014dedfly1fcg0zm8syyg209q05kb2a.gif','https://wx1.sinaimg.cn/mw1024/006DkMAtgy1fyerxhpq7yj30qo1bf7cf.jpg','https://ww4.sinaimg.cn/bmiddle/778af509ly1fyedpyrcfhj22o93qhe81.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545318201925&di=2b5f0446e1d0d812a797fe4ea8c644e9&imgtype=0&src=http%3A%2F%2Fwenhui.whb.cn%2Fu%2Fcms%2Fwww%2F201802%2F2819062638v3.jpeg', 'http://ww2.sinaimg.cn/large/0069Ytn8gw1f1coq61vcsg30j90c4x6p.gif', 'https://i.ytimg.com/vi/ZjBGL348ViM/maxresdefault.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545218021813&di=fd1791fad9eb3a2f26cdcd3446865214&imgtype=0&src=http%3A%2F%2Fmsp.baidu.com%2Fv1%2Fmediaspot%2Fd5418400a78d72d88fc9c93e9c9e28dc.gif', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545160652497&di=0d7217e2adb95c9e4886f0953ea85605&imgtype=0&src=http%3A%2F%2Fupload.shunwang.com%2F2017%2F0707%2F1499397252336.gif', '../../utils/img/qrcode.png', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545048572910&di=03bcdcfdfc0da85f5fcbabe3965e8726&imgtype=0&src=http%3A%2F%2Fimg3.a0bi.com%2Fupload%2Fttq%2F20141101%2F1414822466725.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544986835692&di=15ff824f534f90a68a04d0d58f25242c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F08%2F20170808213253_Y2CkH.thumb.700_0.gif', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544865876882&di=7807572d3f4349ef6b2b6a26e2fa9f3b&imgtype=0&src=http%3A%2F%2Fdingyue.nosdn.127.net%2FCF5DxxqxpYb9%3DUbITxGYPPJFzsBqnol5C2hG1deIBL6Cs1512200988707.gif', '../../utils/img/3.jpg', 'https://pic2.zhimg.com/v2-75c9d39192fe8b23ae3da17fe6676185_b.gif', '../../utils/img/2.gif', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544702285655&di=0caf0bab817c28a96f20a5b3d63720f7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201412%2F10%2F20141210013626_iFHit.gif', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544640016558&di=23f17ffff9771e84b3d474ffc6ed8636&imgtype=0&src=http%3A%2F%2Fp0.qhimgs4.com%2Ft01d235f14bf51f9608.gif', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544616900859&di=6e14755fab0ed0a956af65f173d5d655&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180518%2F371c6c004fa6462ba92797ab86584792.gif', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544554394884&di=49c173f8e4921561ae93252217a03856&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa718cd983d6da255f7da9e9f32b0ad392d0cd4ef1f2b7e-jBgoFn_fw658', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544528529488&di=4f35440f7c553e17e91d92f2ad50ef3e&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Fbmiddle%2Fab5349ably1fcznrdpibtg20aq06yqv5.jpg', 'http://img.mp.sohu.com/q_mini,c_zoom,w_640/upload/20170508/6bb1340e7e9a4de3aa397bf74a5810ee.gif', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544442920886&di=aa00f349dbd7a81c16522f27290d2615&imgtype=0&src=http%3A%2F%2Ftpic.home.news.cn%2FxhCloudNewsPic%2Fxhpic1501%2FM0B%2F2F%2F6C%2FwKhTlVgyVVOEBk44AAAAAJuQny8770.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544386564938&di=c50e3b14866bb811106a19121356795c&imgtype=0&src=http%3A%2F%2Fp0.ifengimg.com%2Fpmop%2F2017%2F0723%2F983B3358381A7DAD8BFD89AEB052DC898035F3E6_size1483_w350_h264.gif', 'http://wx2.sinaimg.cn/large/814268e3gy1fieleavzlzg207c09qb29.gif', 'http://mmbiz.qpic.cn/mmbiz_gif/1shT5xiaHHpicLxU1BjibACymCHHeEfpxJuqwbF58J45zNedpXaJWmjhPNMgS9ew3ibOIg5c320t9wgdzgaYHRAqYA/0?wx_fmt=gif', 'http://www.uluruchinesetour.com.au/image/cache/catalog/%E8%87%AA%E9%80%89%E9%A1%B9%E7%9B%AE/%E7%9B%B4%E5%8D%87%E6%9C%BA%E8%83%A1%E6%AD%8C-800x530.jpg', 'https://i0.hdslb.com/bfs/archive/c0d4053c601701fc0d16d9494bf889ac26d0a14d.jpg', 'http://i1.hdslb.com/bfs/archive/fac7cf8a7a7cc0f4e0f0ed3bec214e8aae750cf6.jpg', 'http://78rg3f.com2.z0.glb.clouddn.com/public/images/02/32/5b206c2ddc1e7.jpg', 'http://5b0988e595225.cdn.sohucs.com/images/20181204/e3a56c3d8fc04c4880fae9f6ef9bafda.jpeg', 'https://images.shobserver.com/news/690_390/2016/2/29/a39c69c1-e26c-40a2-90b1-1ac7ef0f4839.jpg', 'http://m.360buyimg.com/mobilecms/s600x682_jfs/t5503/297/410865104/49562/47a39d39/58fefa26N2e7dd93e.jpg!q70.jpg', 'http://5b0988e595225.cdn.sohucs.com/images/20181107/d7c6ccf482a24c8aadfb2fa0e2a07cf4.jpeg', 'http://himg2.huanqiu.com/attachment2010/2016/1123/06/45/20161123064548848.png', 'http://img.cct58.com/caiji/20170713/16/huge-004.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544210659479&di=ab1ed1f05fe39d6188eab6645cd2018b&imgtype=0&src=http%3A%2F%2Fwww.artsbj.com%2Fuploadfile%2Fremote%2F2018%2F1115%2F20181115093335783.gif', 'http://img3.xiazaizhijia.com/walls/20160120/1440x900_f41d6ae9a3740e7.jpg', 'http://www.sinaimg.cn/dy/slidenews/4_img/2016_28/704_1967994_918579.jpg', 'http://photo.pic.sohu.com/images/chinaren/2005-05-15/104e173cbbb.jpg', 'https://tvax4.sinaimg.cn/crop.0.0.996.996.1024/006fDhMMly8ffqma109h9j30ro0ro0uu.jpg', 'https://www.beauty321.com/albums_photo/7006-201810172020401669.jpg', 'http://www.people.com.cn/mediafile/pic/20160912/48/10743183146975167360.jpg', 'http://y2.ifengimg.com/a/2016_02/c9b9ab1888bc777.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543486607954&di=6898c4040848716372b1c65462438fcd&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201509%2F28%2F20150928182756_a3Cvy.jpeg', 'http://pic1.win4000.com/wallpaper/2/5806d62dd3c0e.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543417824274&di=8dbf62700476e692a3e16dcaca2c85fe&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201602%2F29%2F20160229191245_aBviR.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543404053185&di=033e4cbd8507f99a24d2553065a4db43&imgtype=0&src=http%3A%2F%2Fniuerdata.g.com.cn%2Fdata%2Fshareimg_oss%2Fbig_media_img%2F2017%2F12%2F23%2Fb2531c3296c4b93ca6adc057f032e65e.JPEG', 'http://a4.att.hudong.com/07/13/01300542281368141301137365252.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543328939260&di=75d454f10733d73edcc40d7872bec339&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fbaike%2Fpic%2Fitem%2Fd009b3de9c82d158b62f49ef890a19d8bc3e423a.jpg',
      'http://wx4.sinaimg.cn/large/70eb479bly1frlnwii0bjj20ny0nyn27.jpg'
    ],
    music_list: ['http://music.163.com/song/media/outer/url?id=37095432.mp3','http://music.163.com/song/media/outer/url?id=38576323.mp3','http://music.163.com/song/media/outer/url?id=411907881.mp3','http://music.163.com/song/media/outer/url?id=406072193.mp3','http://other.web.ri01.sycdn.kuwo.cn/resource/n1/40/12/1968135052.mp3','http://music.163.com/song/media/outer/url?id=4877777.mp3', 'http://music.163.com/song/media/outer/url?id=863046037.mp3', 'http://music.163.com/song/media/outer/url?id=486068399.mp3', 'http://music.163.com/song/media/outer/url?id=5278076.mp3', 'http://music.163.com/song/media/outer/url?id=5263407.mp3', 'http://music.163.com/song/media/outer/url?id=1921734.mp3', 'http://music.163.com/song/media/outer/url?id=443242.mp3', 'http://music.163.com/song/media/outer/url?id=608667.mp3', 'http://music.163.com/song/media/outer/url?id=405485737.mp3', 'http://music.163.com/song/media/outer/url?id=518088873.mp3', 'http://music.163.com/song/media/outer/url?id=424474255.mp3', 'http://music.163.com/song/media/outer/url?id=28959185.mp3', 'http://music.163.com/song/media/outer/url?id=26485740.mp3', 'http://music.163.com/song/media/outer/url?id=25893908.mp3', 'http://music.163.com/song/media/outer/url?id=25893916.mp3', 'http://music.163.com/song/media/outer/url?id=25893919.mp3', 'http://music.163.com/song/media/outer/url?id=92759.mp3', 'http://music.163.com/song/media/outer/url?id=391568.mp3', 'http://music.163.com/song/media/outer/url?id=92856.mp3', 'http://music.163.com/song/media/outer/url?id=92778.mp3', 'http://music.163.com/song/media/outer/url?id=4874867.mp3,http://music.163.com/song/media/outer/url?id=391566.mp3', 'http://music.163.com/song/media/outer/url?id=28378115.mp3', 'http://music.163.com/song/media/outer/url?id=86365.mp3', 'http://music.163.com/song/media/outer/url?id=4874864.mp3', 'http://music.163.com/song/media/outer/url?id=34057518.mp3', 'http://music.163.com/song/media/outer/url?id=4875310.mp3', 'http://music.163.com/song/media/outer/url?id=86360.mp3', 'http://music.163.com/song/media/outer/url?id=4875306.mp3'],
    vid_list: ['XMzQ3OTA3NTQ1Ng', 'XMzYyNTI5NTA3Mg'], //'XMzYyNTI5NTA3Mg','XMzMyMjQ5MzMyMA','XMTg0NjQ0Mjg3Ng','XMzM2ODU1Mjg5Mg'],//'XMzcxOTIwMjM0NA','XMzA3MDUwMzA5Mg','XMzkyNjU3ODg0OA','XMzYyMjAyOTEyNA','XMzc0NTQ5ODU5Ng', 'XMzA2MjkzMzY4MA', 'XMjQ5MTQzNTA2MA', 'XMzkyMDY2NjAzNg'], //'g0752zh4rww', 'd036582e8u6', 'z0380xvi43z', 'c06000xxl5s'],
    video_list: [],
    vid: '',
    txvContext: "",
    p_idx: 0,
    v_idx: 0,
    m_idx: 0,
    mp_idx: 0,
    t_idx: 0,
    musicTime: '00:00',
    sliderValue: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //console.log(app.globalData.userInfo)
    var that = this;
    that.getWeather();
    if (!innerAudioContext.paused) {
      that.setData({
        music_on: true,
        music_playing: true
      })
    }
    //that.randomMusic();
    // 注册coolsite360交互模块
    var time = util.formatTime(new Date());
    //为页面中time赋值
    that.setData({
      time: time
    });
    that.createTimeStamp();
    //打印
    var BMap = new bmap.BMapWX({
      ak: 'YqLF34TyXP4Y5iNcLF3aZ0zxS0xzxue5'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
      that.getWeather_new(wxMarkerData[0].longitude, wxMarkerData[0].latitude);
    }
    // 发起POI检索请求 
    BMap.search({
      "query": '酒店',
      fail: fail,
      success: success,
      // 此处需要在相应路径放置图片文件 
      iconPath: '../../img/marker_red.png',
      // 此处需要在相应路径放置图片文件 
      iconTapPath: '../../img/marker_red.png'
    });
    let wek = new Date(this.data.year, this.data.month).getDay();
    let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    console.log(show_day[wek]);
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let demo6_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      const date = new Date(this.data.year, this.data.month - 1, i);
      if (wek == 0 || wek == 6) {
        demo6_days_style.push({
          month: 'current',
          day: i,
          color: 'white',
          background: '#f5a8f0'
        });
      } else if (i == this.data.day) {
        demo6_days_style.push({
          month: 'current',
          day: i,
          color: 'white',
          background: '#aad4f5'
        });
      } else {
        demo6_days_style.push({
          month: 'current',
          day: i,
          color: 'black'
        });
      }
    }

    this.setData({
      demo6_days_style
    });
    /*var vid ='d036582e8u6';
    qqVideo.getVideoes(vid).then(function (response) {
      console.log(response)
    })*/
    this.getVideo();
    this.setData({
      vid: "g0815eufqd8"
    });
    //this.txvContext = txvContext.getTxvContext('txv1');
    
    //在播放状态，绑定播放进度更新事件。然后控制进度条和时间显示
    innerAudioContext.onPlay((res) => {
      innerAudioContext.onTimeUpdate(this.timeUpdate)
    })
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key,
      love: true,
      play: true,
      music: true,
      weather: true,
      message: true
    });
    if (this.data.current == "huge") {
      this.setData({
        love: false
      });
    } else if (this.data.current == "video") {
      this.setData({
        play: false
      });
    } else if (this.data.current == "music") {
      this.setData({
        music: false
      });
    } else if (this.data.current == "flashlight") {
      this.setData({
        weather: false
      });
    } else if (this.data.current == "message") {
      this.setData({
        message: false
      });
    }
  },
  voteTitle: function (e) {
    this.setData({
      liuyan: e.detail.value
    });
  },
  okayApiHelloWorld: function (e) {
    console.log("suc");
    /** * 准备接口参数 */
    if (this.data.liuyan == "") {
      return
    }
    let params = {
      s: "App.Table.Create", // 必须，待请求的接口服务名称
      model_name: "pluszero_liuyan",
      data: {} // 可选，根据接口文档，补充更多接口参数
    };
    let _self = this
    params.data["zjl_ext"] = _self.data.liuyan;
    params.data["zjl_time"] = util.formatTime(new Date());
    params.data["zjl_xl"] = app.globalData.userInfo.nickName;
    /** * 对小白接口发起请求 */
    wx.request({
      url: app.globalData.okayApiHost,
      data: okayapi.enryptData(params),
      success: function (wxRes) {
        // TODO：实现你的梦想……
        let res = wxRes.data

        if (res.data && res.data.err_code == 0) {
          // TODO：请求成功
          console.log('ok: ', res.data)
          _self.setData({
            liuyan: ''
          });
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })

        } else {
          // TODO：当前操作失败
          console.log('fail: ', res)
        }

      }
    })
  },
  getWeather_new: function (x, y) {
    //console.log(x)
    //console.log(y)
    var that = this;
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now',
      //method: 'GET',
      data: {
        location: x + ',' + y,
        key: 'e80f01e9cf0745a686cba8e520cd4980'
      },
      //data: 'location=' + x + ',' + y +'&key=e80f01e9cf0745a686cba8e520cd4980',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var xt = '区县：' + res.data.HeWeather6[0].basic.location + '\n体感温度：' + res.data.HeWeather6[0].now.fl + '℃\n相对湿度：' + res.data.HeWeather6[0].now.hum + '\n降水量：' + res.data.HeWeather6[0].now.pcpn + '毫米\n能见度：' + res.data.HeWeather6[0].now.vis + '公里\n';
        that.setData({
          weatherData: that.data.weatherData + xt,
          weatherPic: '../../utils/img/' + res.data.HeWeather6[0].now.cond_code + '.png'
        });
      }
    })
  },
  randomMusic: function (nb) {
    var that = this;
    innerAudioContext.autoplay = true;
    innerAudioContext.src = that.data.music_list[nb]; //'http://music.163.com/song/media/outer/url?id=92778.mp3'; //4874867.mp3';//391566.mp3';//28378115.mp3';//86365.mp3';//4874864.mp3';//34057518.mp3';//4875310.mp3';//86360.mp3';//4875306.mp3';
    innerAudioContext.loop = true;
    innerAudioContext.play();
  },
  createTimeStamp: function () {
    var that = this;
    var sb = parseInt(new Date().getTime() % that.data.pc_list.length);
    while (sb == that.data.p_idx) {
      sb = parseInt(new Date().getTime() % that.data.pc_list.length);
    }
    if (that.data.tb == 0) {
      sb = 0;
      that.setData({
        tb: 1
      })
    }
    that.setData({
      img_url: that.data.pc_list[sb],
      p_idx: sb
    });
    var lb = parseInt(new Date().getTime() % that.data.tc_list.length);
    while (lb == that.data.t_idx) {
      lb = parseInt(new Date().getTime() % that.data.tc_list.length);
    }
    if (that.data.tt == 0) {
      lb = 0;
      that.setData({
        tt: 1
      })
    }
    that.setData({
      tc_sxy: that.data.tc_list[lb],
      t_idx: lb
    });
  },
  dayClick: function (event) {
    /** * 准备接口参数 */
    console.log(event.detail);
    console.log(new Date());
    let params = {
      s: "App.Table.FreeQuery", // 必须，待请求的接口服务名称
      model_name: "pluszero_liuyan",
      where: [], // 可选，根据接口文档，补充更多接口参数
      //group_filed: "zjl_content",
      //op_fun: "SUM",
      //op_field: "id"
    };
    let _self = this
    const year = event.detail.year
    const month = event.detail.month
    const day = event.detail.day
    var tm = [year, month, day].map(util.formatNumber).join('-');
    params.where.push(["zjl_time", "=", tm])
    /** * 对小白接口发起请求 */
    wx.request({
      url: app.globalData.okayApiHost,
      data: okayapi.enryptData(params),
      success: function (wxRes) {
        // TODO：实现你的梦想……
        let res = wxRes.data

        if (res.data && res.data.err_code == 0) {
          // TODO：请求成功
          //console.log('ok: ', res.data)
          console.log(res.data.list)
          var jlc = "";
          var lc = "";
          var j = 0;
          var k = 0;
          for (var i = 0; i < res.data.list.length; ++i) {
            if (res.data.list[i].zjl_xl == "嘉琳") {
              jlc += "+" + j + " ";
              if (res.data.list[i].zjl_content) {
                jlc += res.data.list[i].zjl_content;
              }
              if (res.data.list[i].zjl_ext) {
                jlc += res.data.list[i].zjl_ext;
              }
              jlc += '\n';
              j += 1;
            } else {
              lc += "-" + k + " ";
              if (res.data.list[i].zjl_content) {
                lc += res.data.list[i].zjl_content;
              }
              if (res.data.list[i].zjl_ext) {
                lc += res.data.list[i].zjl_ext;
              }
              lc += '\n';
              k += 1;
            }
          }
          wx.navigateTo({
            url: '../content/content?jlly=' + jlc + "&lly=" + lc
          })

        } else {
          // TODO：当前操作失败
          console.log('fail: ', res)
        }

      }
    })
  },
  getVideo: function () {
    var sb = parseInt(new Date().getTime() % this.data.vid_list.length);
    while (sb == this.data.v_idx) {
      sb = parseInt(new Date().getTime() % this.data.vid_list.length);
    }
    if (this.data.ts == 0) {
      sb = 0;
      this.setData({
        ts: 1
      })
    }
    this.setData({
      v_idx: sb
    })
    let params = {
      s: "App.Table.FreeQuery", // 必须，待请求的接口服务名称
      model_name: "pluszero_video",
      logic: "or",
      where: [], // 可选，根据接口文档，补充更多接口参数
      //group_filed: "zjl_content",
      //op_fun: "SUM",
      //op_field: "id"
    };
    let _self = this
    for (var i = 0; i < this.data.vid_list.length; ++i) {
      params.where.push(["vid", "=", this.data.vid_list[i]])
    }
    console.log(params.where)
    /** * 对小白接口发起请求 */
    wx.request({
      url: app.globalData.okayApiHost,
      data: okayapi.enryptData(params),
      success: function (wxRes) {
        // TODO：实现你的梦想……
        let res = wxRes.data

        if (res.data && res.data.err_code == 0) {
          // TODO：请求成功
          //console.log('ok: ', res.data)
          console.log(res.data.list)
          var v_list = [];
          for (var j = 0; j < _self.data.vid_list.length; ++j) {
            for (var i = 0; i < res.data.list.length; ++i) {
              if (_self.data.vid_list[j] == res.data.list[i].vid) {
                var obj = {};
                obj.video_url = res.data.list[i].url_new;
                if (sb == j) {
                  obj.hidden = false;
                } else {
                  obj.hidden = true;
                }
                v_list.push(obj);
              }
            }
          }
          _self.setData({
            video_list: v_list
          })
          console.log(_self.data.video_list)
        } else {
          // TODO：当前操作失败
          console.log('fail: ', res)
        }

      }
    })
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = "../../utils/img/marker_yellow.png";
      } else {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = "../../utils/img/marker_red.png";
      }
      markers[j] = data[j];
    }
    that.setData({
      markers: markers
    });
  },
  getWeather() {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'YqLF34TyXP4Y5iNcLF3aZ0zxS0xzxue5'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        weatherData: weatherData
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },
  bindTapPlay() {
    if (this.data.music_playing == true) {
      innerAudioContext.pause();
      this.setData({
        music_on: false,
        music_playing: false
      })
      wx.showToast({
        title: '暂停播放',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    } else {
      if (this.data.tm == 0) {
        var nb = 0;
        this.setData({
          tm: 1
        })
        this.randomMusic(nb);
      } else {
        innerAudioContext.play();
      }
      wx.showToast({
        title: '开始播放',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      this.setData({
        music_on: true,
        music_playing: true
      })
      console.log(this.data.music_playing)
    }
  },
  bindTapPrev() {
    this.randomMusic(this.data.mp_idx);
    wx.showToast({
      title: '上一首',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  bindTapNext() {
    var that = this;
    var nb = parseInt(new Date().getTime() % that.data.music_list.length);
    while (that.data.m_idx == nb) {
      nb = parseInt(new Date().getTime() % that.data.music_list.length);
    }
    that.setData({
      mp_idx: that.data.m_idx
    })
    that.setData({
      m_idx: nb
    })
    this.randomMusic(nb);
    wx.showToast({
      title: '下一首',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  getPlace: function () {
    var fail = function (data) {
      console.log(data)
    };
    var that = this;
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    };
    // 发起POI检索请求 
    var BMap = new bmap.BMapWX({
      ak: 'YqLF34TyXP4Y5iNcLF3aZ0zxS0xzxue5'
    });
    console.log(that.data.place_info)
    BMap.search({
      "query": that.data.place_info,
      fail: fail,
      success: success,
      // 此处需要在相应路径放置图片文件 
      //iconPath: '../../img/marker_red.png',
      // 此处需要在相应路径放置图片文件 
      //iconTapPath: '../../img/marker_red.png'
    });
  },
  getPlace_info: function (e) {
    this.data.place_info = e.detail.value;
  },
  audioChange: function (e) {
    var length = innerAudioContext.duration;
    var percent = e.detail.value;
    //用进度条百分比 *　整个音乐长度
    var musicTime = Math.round(length / 100 * percent);
    innerAudioContext.seek(musicTime);

    //因为在拖动进度条时，去除了时间绑定，所以进度改变后重新绑定
    innerAudioContext.onTimeUpdate(this.timeUpdate);

    this.setData({
      musicTime: this.musicTimeFormat(musicTime)
    })
  },
  //进度条拖动过程中触发事件
  audioChanging: function (e) {
    //因为在进度条拖动的时候，还会在timeUpdate里面修改进度条的value，倒置拖动受影响，所以当拖动的时候需要取消绑定
    innerAudioContext.offTimeUpdate();

    //拖动时修改时间显示
    var length = innerAudioContext.duration;
    var percent = e.detail.value;
    var musicTime = Math.round(length / 100 * percent);
    this.setData({
      musicTime: this.musicTimeFormat(musicTime)
    })
  },

  //将秒钟转化为mm：ss的时间格式
  musicTimeFormat: function (time) {
    var second = Math.floor(time % 60);
    if (second < 10) {
      second = '0' + second;
    }
    var minute = Math.floor(time / 60);
    if (minute < 10) {
      minute = '0' + minute;
    }
    return minute + ':' + second;
  },

  //播放的时候，更新进度条和时间显示
  timeUpdate: function () {
    var time = innerAudioContext.currentTime;
    var percent = Math.round(time / innerAudioContext.duration * 100);
    this.setData({
      musicTime: this.musicTimeFormat(time),
      sliderValue: percent
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() { 
    innerAudioContext.onEnded((res) => {
      //修改属性。去除css状态
      this.setData({
        music_on: false,
        music_playing: false
      })
      //重新播放
      innerAudioContext.seek(0);
      this.setData({
        musicTime: '00:00',
        sliderValue: 0
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    /*if (this.data.music_playing == true) {
      innerAudioContext.pause();
      this.setData({
        music_on: false,
        music_playing: false
      })
    } else {
      innerAudioContext.play();
      if (this.data.tm != 0) {
        this.setData({
          music_on: true,
          music_playing: true
        })
      }
    }*/
    //this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },


})