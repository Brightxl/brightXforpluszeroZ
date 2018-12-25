//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Merry Christmas~\n——— Photo by 当时会手抖的短腿猪猪🎄',//'🎄',//'❄',//'PART-Ⅱ',//'Photo from BAZAAR 2016 Sulwhasoo',//'喵喵喵~\n———Hello Kitty',//'没错，他的确不是白马王子，\n但他内在有我之前所没看见的。\n———迪士尼动画《美女与野兽》',//'不管前方的路有多苦，只要走的方向正确，\n不管多么崎岖不平，都比站在原地更接近幸福。\n———《千与千寻》',//'如果把童年再放映一遍，我们一定会先大笑，\n然后放声痛哭，最后挂着泪，微笑着睡去。\n———《龙猫》记第一次约你去听的动漫视听音乐会',//'今天又是崭新的一天！\n———Judy🐰',//'猪猪怎么就不好了嘛 猪猪那么可爱\n———pluezeroZ Weibo🐷',//'日常想念兔兔家~\n———pluszeroZ🤗',//'“他们都是我曾经的兄弟，\n是我在六十六军一五九师里的兄弟。”\n———《四十九日祭》戴涛,胡歌饰,12月13日-国家公祭日',//'我走过山时，山不说话，\n我路过海时，海不说话，\n小毛驴滴滴答答，倚天剑伴我走天涯。\n大家都说我因为爱着杨过大侠，才在峨眉山上出了家,\n其实我只是爱上了峨眉山上的云和霞，\n像极了十六岁那年的烟花。\n————2016年12月13日胡歌微博引用《致郭襄》',//'小的时候我家住着超人，他是个能够修理世上所有东西的百战天龙。\n何时何地有谁遇到了麻烦他就会出现，然后解决一切，就像万能侠客一样。\n他是个不会懦弱的超级英雄般的存在，\n但是当我懂事之后才好不容易明白了只是没有被发现罢了，超人也是人。\n有多少肮脏 卑鄙 令人作呕 悲伤 可怕 累人的世界从爸爸的面前闪过了呢.\n而现在我才好不容易懂得了，不论多么肮脏 卑鄙 令人作呕 悲伤 可怕 或是累人,\n他之所以能够坚强地挺过来是因为有要守护的人。\n因为有家人、有我在，不是出于别的理由，是因为他要以父亲的名义生活下去。\n————2015年冬天带来温暖的《请回答1988》',//'He looks for the good in all of us.\n———第一次帮你修电脑后去看的《帕丁顿熊2》🐻'//'爱和正义的，水手服美少女战士，\nSailor Moon 我要代表月亮惩罚你噢。\n             ———月野兔🧚‍♀',//'我心中的白马王子啊，\n是我一有危险就会马上来拯救我的那种。\n             ———月野兔🧚‍♀',//'Q:"什么样的朋友是真正的好朋友？"\nA:"彼此都不用拼命在对方面前表现得很厉害的样子。"\n———记2017年12月10日白塔公园友谊合照🤗',//'甜甜的，实属上品。\n———《屋塔房王世子》',//'官宣：杭州雪景完胜雪乡了！\n———++0 WeChat',//'“健康，善良，认真，有爱心，有责任心”\n———2014.02.19<小🐷一枚>ins',//记得吃药鸭🤗','家人是比梦想更重要的事情\n———去年这时候看的《寻梦环游记》','MS201405140104','如果世界颠倒'
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../page/page'
    })
  },
  bindViewTap1: function(){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
