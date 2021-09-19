import * as Mock from "mockjs";
import { config } from '../apis';

var Random = Mock.Random;

const count: number[] = Mock.mock("@range(25)");
let list = tableFun();


type listType = {
  id: number,
  name: string,
  types: number,
  image: string,
  recommend: number,
  iconfont: string,
  rate: number,
  href: string,
  text: string,
  price: string,
  oldPrice: string,
  date: string,
}
function tableFun():listType[] {
  let each: listType[] = [];
  for (let i in count) {
    let name: string = Random.ctitle();
    each.push(
      Mock.mock({
        id: Number(i) + 1,
        name,
        "types|1": [0, 1, 2],
        image: Random.image("100x100", Random.color(), name),
        "recommend|1": [0, 1],
        iconfont: "vitehome-liulanliang",
        rate: "@integer(0,5)",
        href: "https://gitee.com/abc1612565136/vite-admin",
        text: "@cparagraph()",
        price: "",
        oldPrice: "@natural(30,100)",
        date: "@date()",
      })
    );
  }

  return each;
}

export default [
  {
    url: "modules/table",
    response: (config: config) => {
      let size = Number(config.query.pageSize);
      let num = Number(config.query.pageNum);

      let date = config.query.date || "";
      let types = config.query.types || "";
      let name = config.query.name || "";

      if (date != "") {
        list.sort(function (a: listType, b: listType) {
          if (date == "descending") {
            return Number(b.date.split("-").join("")) - Number(a.date.split("-").join(""))
          } else {
            return Number(a.date.split("-").join("")) - Number(b.date.split("-").join(""))
          }
        });
      }
      let listCopy = list;
      if (types != "") {
        listCopy = listCopy.filter((item: listType) => item.types == types);
      }
      if (name != "") {
        listCopy = listCopy.filter(
          (item: listType) => item.name.indexOf(name) != -1
        );
        console.log(name, listCopy);
      }

      return {
        code: 200,
        data: {
          list: listCopy.filter((item: listType, index: number) => {
            return index >= (num - 1) * size && index < num * size;
          }),
          pageNum: num,
          pageSize: size,
          totalpageNum: Math.ceil(listCopy.length / size),
          total: listCopy.length,
        },
      };
    },
  },
  {
    url: "modules/richText",
    response: {
      code: 200,
      data: `<p>　　巴尼小镇是云南省怒江傈僳族自治州首个易地扶贫搬迁集中安置点。从山上的金满村搬迁到巴尼小镇，近3年的时间里，搬迁户们的生活发生了可喜的变化。</p>

      <p class="photo_img_20190808" style="text-align: center;"><img style='width:100%' src="//p2.img.cctvpic.com/photoworkspace/contentimg/2020/07/16/2020071613380766481.jpg" alt="泸水市巴尼小镇易地扶贫搬迁安置点全景 李韩金摄（人民视觉）" isflag="1"></p>

      <p class="photo_alt_20190808" style="text-align: center;"><em></em>泸水市巴尼小镇易地扶贫搬迁安置点全景 李韩金摄（人民视觉）</p>

      <p>　　搬出四面透风、容易漏雨的“千脚落地房”，住进如今宽敞明亮的楼房，当地居民的生活不断改善。另一边，留在山上的村民在企业帮助下改种经济林果，家庭收入节节攀升。</p>

      <p class="photo_img_20190808" style="text-align: center;"><img style='width:100%' src="//p3.img.cctvpic.com/photoworkspace/contentimg/2020/07/16/2020071613382671669.jpg" alt="金满村搬迁户在巴尼小镇的扶贫车间里上班 余秀英摄（人民视觉）" isflag="1"></p>

      <p class="photo_alt_20190808" style="text-align: center;"><em></em>金满村搬迁户在巴尼小镇的扶贫车间里上班 余秀英摄（人民视觉）</p>

      <p>　　这阵子，52岁的米四东心里老惦记个事：吃两碗包谷稀饭。包谷稀饭是把包谷和蚕豆混在一起，有时加点腊肉，搁在三脚架上，生火煮制而成。在高黎贡山上，包谷稀饭曾是金满村人的主食，大多数人连个菜都不舍得炒，就配一碗蘸水吃。从山上搬下来快3年了，米四东说：“在山上盼着吃大米饭，如今天天吃米饭，又想念包谷稀饭了。”</p>

      <p>　　米四东的家在巴尼小镇，地处云南省怒江傈僳族自治州泸水市洛本卓白族乡，紧邻着怒江。这里是怒江州首个易地扶贫搬迁集中安置点，2017年国庆节，金满村首批40户村民入住，2018年最后11户村民入住新居。如今已有搬迁户168户744人，都属于白族支系勒墨人。</p>

      <p>　　3年时间，这里的人和生活发生了哪些变化？这个夏天，记者走进了巴尼小镇。</p>

      <p>　　曾经——</p>

      <p>　　8公里的距离，20年的差距</p>

      <p>　　村民叁益光的家里干净亮堂，客厅的墙上，挂着一家三口在老房子前的合影。由于山地太陡，找不到平地打地基，老房子都是篱笆为墙、木板为顶、木头为柱的“千脚落地房”的样子。四面透风的房子里面黑黢黢的，下面养牲畜，中间住人，上面放粮食。“一入雨季，屋里就怕漏雨，潮乎乎有虱子”。2017年搬迁前，金满村九成村民就住在这种房子里。</p>

      <p>　　从巴尼小镇往背后的高黎贡山深处走，沿着一条水泥路走上8公里，就回到了金满村村委会。金满村11个村民小组，其中5个不通公路、1个是地质灾害隐患点，这6个组如今已整体搬迁。“最远的马社王底小组有16户人家，到村委会要过悬崖、涉小河、爬陡坡，走上三四个小时。”说起过往，村委会主任沈光干嘘唏不已。</p>

      <p>　　站在村委会的院子里，只见大山围绕、白云悠悠，山外面还是山。2014年底，金满村人均收入仅有1400多元，全村1310人有建档立卡贫困户1250人。沈光干说：“在山上，一年到头辛辛苦苦，还是穷成这个样！”</p>

      <p>　　听老人们说起以前的生活，就像听“穿越故事”一样：去邻近的县背洋芋回来种，前后得一星期，头疼脑热不舍得花钱去卫生院……“过去从金满村到巴尼小镇的8公里距离，也是发展相差20年的距离。”巴尼小镇社区副主任和碧武介绍，群众刚搬出大山时，不会用电器，连起床叠被子的习惯都没有。</p>

      <p>　　不过，在宽敞明亮的楼房里住上一段时间，大家都知道了现代生活的好处。乡中心完小五年级的学生花燕梅一家去年搬到小镇上，每天早上走几分钟就能到学校。“搬下来好，在这里衣服不容易脏，老师也讲得好！”孩子的话，总是简单明了。</p>

      <p>　　如今，按照“一户一宅基地”的政策，米四东在山上的老房子拆了，一家人踏踏实实住在了小镇上。米四东感慨：“还是在山下容易赚钱。”</p>

      <p>　　山下——</p>

      <p>　　干活更方便，管理更规范</p>

      <p>　　在巴尼小镇，最常见的交通工具就是摩托车，还有不少人家门口停着机动三轮车、小货车和轿车。米四东说，有了钱，大家都愿意买辆摩托车，“干活方便了许多。”</p>

      <p>　　记者了解到，巴尼小镇目前外出务工118户282人，以本地打零工为主。在小镇上，就有家扶贫车间生产民族服装，平时有20多个女工。车间的管理人员告诉记者，一个熟练女工一个月挣三四千元没问题。</p>

      <p>　　赚得多了，还要看花得多不多，对于搬出大山的人来说，上楼后的生活成本增加了多少？</p>

      <p>　　米四东算了算账：小镇的水费一户每年20元，电费也不贵，过日子主要就是买些吃的。“这个就丰俭由己了，青菜要买，土豆南瓜山上就有。”</p>

      <p>　　和碧武介绍，随着巴尼小镇社区建设越来越规范，一些以前“难以想象”的方法都有了实打实的用处。“比如我们这里实行积分制管理，积极参加升国旗仪式、搞好卫生都有加分，居民可以到超市用积分兑换商品。”社区超市经营者玉花梅说，去年超市里兑换了2万多元的积分。</p>

      <p>　　当然，搬下来的时间并不长，对大部分人来说还是处在适应阶段。在和碧武看来，村子里的人与外界的交流还是偏少，视野和观念转变得还不够快。</p>

      <p>　　米四东就有这种体会。洛本卓白族乡是“中国民间文化艺术之乡”，金满村被列入“云南省第四批旅游特色村”。作为州级非物质文化遗产传人，米四东如今在巴尼小镇教授勒墨人的传统歌舞。“等哪天怒江大峡谷的旅游火起来了，这门技艺一定会是旅游的‘招牌’产品。”米四东心里寻思着。</p>

      <p>　　山上——</p>

      <p>　　既抓“生态账”，又算“经济账”</p>

      <p>　　一边是米四东感慨“山下容易赚钱”，另一边却是仍然留在山上的5个村民小组80户人家，如今的8公里，还有20年的发展差距吗？</p>

      <p>　　“‘两不愁三保障’早就实现了，现在村里的生活跟过去相比简直是天壤之别。眼下村里惦记的，是怎样既抓‘生态账’，又算‘经济账’。”洛本卓乡宣传委员麻继成兼任金满村党总支书记，搬迁启动前就驻村工作，到现在还扎在村里忙活调整种养殖业结构。</p>

      <p>　　靠山吃山，金满村过去是在四五十度的山坡地上开荒种包谷，如今要进行山体生态修复，除了改种经济林果，别无他法。</p>

      <p>　　麻继成说，乡里组织搬迁群众将原住地的土地林地出租、流转或退耕还林，采取“合作社+村党总支+农户+基地”模式，种植花椒、核桃、草果、香橼等经济作物。现在，1000多亩花椒、1000多亩核桃、600多亩草果和300多亩香橼已经成了山上的“绿色银行”。“村里今年准备再发展250亩香橼，香橼两年就能挂果，收益前景非常可观。”</p>

      <p>　　农产品“升了级”，收入也“开了源”。麻继成说，农民在企业承包的果园里务工，每天的工资有100元，如今每天都有二三十人在果园里干活。</p>

      <p>　　“搬出去有盼头，留下来有干劲。”如今，乡里还在加紧研究制定金满村乡村旅游规划。“等客栈、农家乐、步行街都建好了，幸福一定来敲门。”洛本卓乡党委书记郝春荣说，巩固脱贫成果、走向乡村振兴，“好日子还在后头”。</p>`,
    },
  },
];
