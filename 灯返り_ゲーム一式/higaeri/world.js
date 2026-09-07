'use strict';
window.HG = { VERSION: 1, T: 32, W: 768, H: 432 };
(function(H){
 const maps={};
 function make(id,name,palette){const m={id,name,palette,w:44,h:30,tiles:Array.from({length:30},()=>Array(44).fill(0)),objects:[],lamps:[],enemies:[],exits:[],spawn:{x:22*32,y:18*32}};for(let y=0;y<30;y++)for(let x=0;x<44;x++)if(x<1||y<1||x>42||y>28)m.tiles[y][x]=3;maps[id]=m;return m}
 function rect(m,x,y,w,h,t){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)if(m.tiles[j]&&i>=0&&i<m.w)m.tiles[j][i]=t}
 function obj(m,id,type,x,y,data={}){m.objects.push({id,type,x:x*32,y:y*32,...data})}
 function house(m,id,x,y,w,h,tint,sign){rect(m,x,y,w,h,3);obj(m,id,'house',x,y,{w:w*32,h:h*32,tint,sign,solid:{x:x*32,y:y*32,w:w*32,h:h*32}})}
 function tree(m,x,y,variant=0){obj(m,'tree'+x+'_'+y,'tree',x,y,{variant,solid:{x:x*32-7,y:y*32-5,w:14,h:12}})}
 function lamp(m,x,y,r=115,color='#f4c17c'){m.lamps.push({x:x*32,y:y*32-8,r,color});obj(m,'lamp'+x+y,'lamp',x,y)}
 function interact(m,id,type,x,y,label){obj(m,id,type,x,y,{label,interact:true})}
 function enemy(m,type,x,y,route){m.enemies.push({type,x:x*32,y:y*32,route:route.map(p=>({x:p[0]*32,y:p[1]*32}))})}
 function exit(m,x,y,w,h,to,tx,ty,requires){m.exits.push({x:x*32,y:y*32,w:w*32,h:h*32,to,tx:tx*32,ty:ty*32,requires})}
 function trees(m,points){points.forEach(p=>tree(m,...p))}
 let m=make('home','水無月町・住宅街','blue');rect(m,1,15,42,5,1);rect(m,20,1,5,28,1);rect(m,7,13,5,12,2);rect(m,28,7,10,3,2);rect(m,30,9,3,7,2);
 house(m,'yourHouse',6,7,7,6,'#3c4e63','篠原');house(m,'h2',2,1,11,4,'#34404f','');house(m,'h3',27,2,12,5,'#3e454e','');house(m,'h4',27,22,10,6,'#414251','');house(m,'h5',2,25,12,4,'#34434c','');
 interact(m,'mailbox','mailbox',10,14,'赤い郵便受け');interact(m,'homeJizo','jizo',19,17,'お地蔵さま');lamp(m,18.6,17,105);interact(m,'phone','phone',31,16,'鳴っている公衆電話');lamp(m,32.5,16,90,'#98d1bb');interact(m,'notice','board',25.6,14.4,'町内の掲示板');interact(m,'memorySwing','swing',8,22,'動いているブランコ');interact(m,'memoryShoes','shoes',35,9,'小さな長靴');interact(m,'homeDoor','door',9.5,13.6,'家の玄関');obj(m,'car','car',15,12);obj(m,'bicycle','bicycle',27,20.5);obj(m,'drain','drain',22,21);lamp(m,10,18,100);lamp(m,37,18,110);lamp(m,22,6,80);trees(m,[[3,14],[15,7],[17,10],[4,22],[13,23],[25.5,24],[39,7],[40,25],[17,26],[28,11]]);
 enemy(m,'listener',24,21,[[25,21],[25,26],[18,26],[18,21]]);exit(m,42,15,2,5,'market',2.2,18,'bell');exit(m,20,0,5,1.5,'river',10,27,'mirror');
 m=make('market','宵待ち商店街','amber');rect(m,1,16,42,5,1);rect(m,20,5,6,22,2);rect(m,6,10,33,4,2);rect(m,6,12,3,5,2);rect(m,33,12,3,5,2);
 house(m,'shop1',3,4,10,6,'#56484b','みずの菓子店');house(m,'shop2',28,3,12,6,'#414654','写真館');house(m,'shop3',3,23,12,6,'#414449','理容 あおば');house(m,'shop4',28,23,11,6,'#59484a','よろず屋');obj(m,'stage','stage',20,7,{w:6*32,h:3*32});interact(m,'mask','mask',22.5,10.5,'裏返しのお面');interact(m,'stall','stall',21,15,'お面屋の老人');interact(m,'chimes','chimes',12,14.5,'三つの風鈴');interact(m,'marketJizo','jizo',4,19,'お地蔵さま');lamp(m,4,19,110);interact(m,'memoryPhoto','photo',34,10,'写真館の引き出し');interact(m,'memoryCandy','candy',9,11,'金平糖の缶');interact(m,'marketSign','board',29,15,'祭りの貼り紙');obj(m,'vending','vending',36,16);lamp(m,36,16,82,'#b0d7da');obj(m,'cart','cart',16,20.8);trees(m,[[17,5],[26,6],[40,11],[40,24],[18,26]]);[8,13,18,24,29,34,39].forEach((x,i)=>{obj(m,'lantern'+i,'lantern',x,17.5);m.lamps.push({x:x*32,y:17.5*32-38,r:62,color:'#ee985e'})});
 enemy(m,'umbrella',23,12,[[18,12],[27,12],[27,16],[18,16]]);enemy(m,'parade',32,20,[[38,20],[27,20],[16,20],[7,20]]);exit(m,0,16,1.5,5,'home',41,18);exit(m,42,16,2,5,'river',2,18,'mirror');
 m=make('river','忘れ川・旧校舎','water');rect(m,22,0,7,30,4);rect(m,1,17,42,4,1);rect(m,22,17,7,4,5);rect(m,8,13,5,16,2);rect(m,33,5,4,23,2);rect(m,30,23,10,4,2);
 house(m,'school',3,4,15,9,'#414c5d','水無月小学校');interact(m,'school','schoolGate',10,14,'閉ざされた校門');interact(m,'locker','locker',15,15,'校門脇の忘れもの箱');interact(m,'riverJizo','jizo',6,18,'お地蔵さま');lamp(m,6,18,120);interact(m,'riverSign','board',19,16,'橋のたもとの石碑');interact(m,'boat','boat',31,18,'岸に着いた紙の舟');interact(m,'memoryTape','tape',11,25,'古いカセット録音機');interact(m,'memoryBox','box',35,25,'流れ着いた木箱');obj(m,'bench','bench',33,8);lamp(m,35,18,110,'#e3c997');lamp(m,10,22,80,'#a8cbd2');trees(m,[[2,22],[5,25],[16,24],[18,7],[31,9],[38,7],[40,13],[40,25],[31,27],[18,28],[37,3]]);enemy(m,'longneck',26,19,[[26,18.8],[24,18.8],[27,18.8]]);enemy(m,'listener',35,12,[[35,8],[35,15],[39,15],[39,8]]);exit(m,0,17,1.5,4,'market',41,18);exit(m,8,28.5,5,1.5,'home',22,2.5);exit(m,42,17,2,4,'shrine',2,24,'thread');
 m=make('shrine','灯守神社・境内','forest');rect(m,1,22,25,5,2);rect(m,20,4,6,23,2);rect(m,6,13,32,4,2);rect(m,7,13,4,11,2);rect(m,32,13,4,12,2);house(m,'temple',17,2,12,5,'#4f4248','灯守');obj(m,'torii','torii',22.5,21);obj(m,'torii2','torii',22.5,11);interact(m,'altar','altar',22.5,8,'三つの窪みがある祭壇');interact(m,'well','well',8,13,'声のする井戸');interact(m,'sister','sister',22.5,6.8,'赤い傘の少女');interact(m,'shrineJizo','jizo',18,24,'お地蔵さま');interact(m,'shrineTablet','board',28,15,'灯守の由来');interact(m,'memoryTree','ribbonTree',34,12,'リボンを結んだ木');lamp(m,18,24,120);lamp(m,19,8,125);lamp(m,27,8,125);lamp(m,8,16,80);lamp(m,34,17,75);for(let y=3;y<29;y+=4)for(let x=3;x<42;x+=5){if(m.tiles[y][x]===0)tree(m,x+.3,y+.5,(x+y)%3)}enemy(m,'parade',23,18,[[21,18],[24,18],[24,23],[21,23]]);exit(m,0,22,1.5,5,'river',41,18);
 // Hand-placed neighborhood details keep roads readable while giving each district a history.
 Object.values(maps).forEach(m=>{
  m.objects.filter(o=>o.type==='house').forEach((h,i)=>{
   obj(m,'pots'+i,'pots',h.x/32+.6,(h.y+h.h)/32+.3);
   obj(m,'ac'+i,'ac',(h.x+h.w)/32-.7,(h.y+h.h)/32-.45);
   obj(m,'gutter'+i,'gutter',h.x/32-.15,(h.y+h.h)/32-.1,{height:h.h-22});
  });
 });
 m=maps.home;obj(m,'fence1','fence',2,20.7,{w:12*32});obj(m,'fence2','fence',28,10.8,{w:10*32});obj(m,'power1','power',16.5,18,{toX:38*32,toY:18*32});obj(m,'power2','power',38,18,{toX:38*32,toY:28*32});obj(m,'hydrant','hydrant',25,20);obj(m,'bins','bins',14.1,11.5);obj(m,'chalk','chalk',11,21);obj(m,'flowers','flowers',8,24);lamp(m,10.5,13.5,88,'#d1ad7f');
 m=maps.market;obj(m,'banner1','banner',6,16);obj(m,'banner2','banner',31,16);obj(m,'string','string',7.5,17.5,{toX:40*32,toY:17.5*32});obj(m,'boxes','bins',29,11);obj(m,'flowers','flowers',5,22);obj(m,'flowers2','flowers',39,22);obj(m,'fence','fence',4,2,{w:34*32});
 m=maps.river;obj(m,'fence','fence',2,14.2,{w:6.5*32});obj(m,'fence2','fence',11.5,14.2,{w:7*32});obj(m,'flowers','flowers',33,27);obj(m,'hydrant','hydrant',14.4,23.6);obj(m,'power','power',17.8,19,{toX:38*32,toY:19*32});
 m=maps.shrine;obj(m,'ema','ema',29,10);obj(m,'stones','stones',14,19);obj(m,'stones2','stones',29,23);obj(m,'flowers','flowers',7,19);
 H.maps=maps;
 H.chapters=[{title:'返事のない家',sub:'午後十一時。夏休みの終わり。'},{title:'お面の裏の名前',sub:'誰もいないのに、祭りは続いている。'},{title:'川が覚えている',sub:'なくしたものは、下流ではなく昨日へ流れる。'},{title:'帰り道をつくる',sub:'名前を呼ぶことと、引き止めること。'},{title:'灯返り',sub:'朝になる前に、ひとつだけ約束を。'}];
 H.items={bell:{name:'声の鈴',desc:'公衆電話から落ちた鈴。風より先に、誰かの声で鳴る。'},mask:{name:'裏返しのお面',desc:'内側に「知らないことを、知っているふりで埋めない」とある。'},mirror:{name:'記憶の鏡',desc:'こちらを映さない鏡。思い出すと、水面のように揺れる。'},key:{name:'忘れもの箱の鍵',desc:'校門にかかっていた小さな鍵。紬の字で「言えなかったこと」。'},thread:{name:'約束の糸',desc:'赤い傘の縫い糸。切れたのではなく、ほどかれている。'},name:{name:'ふたりの呼び名',desc:'「みおねえ」「つむ」。誰かの役目ではなく、ふたりだけの名前。'}};
 H.memories={memorySwing:{title:'01 / ブランコの約束',text:'「百まで数えたら、迎えにきて」\n私は百まで数えた。紬は、百の先にも数があることを、まだ知らなかった。'},memoryShoes:{title:'02 / 左右の長靴',text:'紬はいつも長靴を逆に履いた。叱ると「足が、けんかしないように」。\nそれから私は、履かせ直す前に笑うようになった。'},memoryCandy:{title:'03 / 星を数える',text:'「おねえちゃんの分、取っといた」\n缶の中には白い金平糖だけ。私が白を好きだと言ったことはない。紬が好きだった色だ。'},memoryPhoto:{title:'04 / 写真にいない人',text:'祭りの写真。私はカメラを見ている。紬は私を見ている。\n写真の裏に「ねえちゃんが、たのしそうだったひ」。'},memoryTape:{title:'05 / 言い直した声',text:'録音の中で私は言った。「もう、ついてこないで」\nそのあと、小さな声。「……うそ。ちょっと、待って」\n紬に届いたのは、最初のほうだけだった。'},memoryBox:{title:'06 / 渡されなかった手紙',text:'『ねえちゃんへ。わたしがいなくても、たのしいひをつくってね。\nでも、ときどき、わたしのすきなあめをかってね。つむぎ』\n子どもの遺書ではない。引っ越す友だちの真似をした、ただの手紙だった。'},memoryTree:{title:'07 / 結び直す',text:'紬は、ほどける結び方しかできなかった。\n「また会ったら、ねえちゃんが結んで」\nそれは永遠に離れない約束ではなく、もう一度会えるという信頼だった。'}};
 H.lore={listener:{name:'耳待ち',text:'足音を集めて歩く女。走る音を遠くから聞く。近くでは走らず、草陰で Ctrl を押して息をひそめる。灯りは消さなくてもよい。'},umbrella:{name:'傘喰い',text:'灯りを雨と間違える、裏返った傘。光を向けると追ってくる。F で灯りを消し、走らずにすれ違う。'},longneck:{name:'橋のぞき',text:'水に映る顔を数える首。こちらが動くと近づく。橋で現れたら、動かずに灯りを向ける。しばらくすると水へ戻る。'},parade:{name:'紙の列',text:'祭りに置いていかれた紙人形。一定の道を巡り、光にも足音にも反応しない。列から距離を取り、通り過ぎるのを待つ。'}};
})(HG);
