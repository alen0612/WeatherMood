Today
|\_Showinfo
|\_Searchbar

Today 只負責兩件事: 1.裝 Showinfo 和 Searchbar 兩個 Components
2.display background image，並且根據由 Searchbar 傳過來的 weather description 切換不同的 image

Showinfo 也很簡單:
接收由 Searchbar 傳過來的 temperature、weather description，把這兩個東西 display 出來，再依照 weather description 切換 logo image(應該要和 background image 同步)

Searchbar 會負責所有複雜的部份:
首先要提供兩個 input 和一個 button，一個 input 讓 user 可以輸入不同的城市，另一個讓 user 選溫度單位，之後按下 button，把 user 輸入的城市送到 API 去抓天氣資料，之後把要給 Today 和 Showinfo 的資料傳出去

這邊會有一個問題。
因為 Searchbar 被設計成是 Today 的 child component，所以他們兩個要進行 data flow 很簡單，但 Searchbar 和 Showinfo 都是 child component，不太確定有沒有辦法建立 data flow。
實際上讓 Today 去負責所有複雜的事情，然後再把資料傳給兩個 child component 是比較直覺的做法，但這樣做的話，其實 Searchbar 這個 component 就沒有存在的必要了，因為你會發現，上面他所負責的事情，並沒有"接受其他 component 的 data"，也就是說，如果 Searchbar 本身沒有要負責的事情的話，這個 component 就沒有存在的必要了，他就只是兩個 input 跟一個 button 而已，但我想要把畫面上所有的東西切割成一個一個的 component，讓他們有各自負責的工作，再將他們串聯起來。

原本是這樣想的。
當然在實作上並不會有什麼問題，唯一一個有遇到的狀況是，因為是在 Searchbar 這邊接收 user input 之後透過 API 去抓資料，然後再把抓到的 Weather ID 傳回去 Today，Today 在接到 ID 之後，再去判斷說要把 background image 換成什麼，這中間會有一個時間差。
通常我會需要在第二次按下 button 之後，background image 才會改變，我自己猜測是 async 的問題。

後來再回去看 React 的 documentation，有關於"提升 State"的部分，在結尾的部分有一個重點:

> 在 React 應用程式中，對於資料的變化只能有一個唯一的「真相來源」。通常來說，state 會優先被加入到需要 render 的 component。接著，如果其他的 component 也需要的話，你可以提升 state 到共同最靠近的 ancestor。你應該依賴上至下的資料流，而不是嘗試在不同 component 之間同步 state。

我自己對這段話的理解是:
Components 之間當然可以有 data flow，但他們應該盡量被設計成是"上對下"，也就是 parent 對 children，應該要盡力去避免讓非上對下關係的 components 之間去做溝通。
以我的例子來說，我應該要讓 Today 去負責大部分的事情，然後把部分的功能下放到 Searchbar 和 Showinfo 去，給它們一些 functional props，讓他們去 handle 這些東西，而不是把主要的職責丟給 child component，讓他們去把資料往上傳。
這也可以解釋為什麼我會需要去做 children 之間的溝通這種奇怪的事情。

---

在把 data flow 重新設計一遍之後，整個感覺都好很多了，開發上也順利不少，可能因為本來就應該這樣做吧。
前面碰到的那個問題，就是關於 background image render 過慢的狀況，在我重新寫過 data flow 之後依然存在。
我嘗試把 get API 的 response 印出來，看看他和真正網頁 render 的速度差別(我在 console 跟網頁上都放了一份 data output)。
結果發現，其實在我按下 button 的時候，console 那邊就有結果了，但網頁這邊還沒，似乎是還需要一點時間來做 data update 和資料更新。

我原本的做法是，拿到 API response 之後去 set temp、id 的 state，然後再 call 一個 checkWeather 的 function 去依照 ID 的不同來 setWeather 和切換 background image。
但問題在於說，當我 call checkWeather 時，裡面用來判斷的 ID 還不是 setId 之後的 ID，也就是說他還是 call API 之前的 ID，這樣就會導致我必須按兩次 button 才會有正確的結果。
因此我在 call checkWeather 時把 response 的 ID 直接傳進去，讓 checkWeather 用這邊的 ID 判斷，就可以創造出兩邊同步的感覺了。

---

Today 第一階段(沒有 post 系統)的最後一步是單位，要提供華氏跟攝氏兩種單位給 user 做選擇。
這個在 API 的部分沒有太大的困難，只要在發 request 的時候加一個 unit 上去就好。
難的地方在 data flow 的部分。

首先，發 request 給 API 的時候用的是"metric"、"imperial"這樣的"單字"，但在給 user 用的 select form 和 weather info 上卻要顯示"°C"、"°F"這樣的"單位"。
Select form 是還好，react 的 select tag 裡面，option 這個 tag 可以把要顯示的資訊和真正的 value 分開，所以我可以讓 user 看到"°C"，但當他點下去時卻是傳送"metric"。
不過因為 data flow 是 downward，所以要先從 Today 這邊送 function 給 Searchbar，讓他去 handle "setUnit" 這個 function(同時他還要 handle "setLocation")，但因為 Searchbar 裡面的 select tag 裡面還有一個 onChange 的 property，如果不給他值，user 在選單位的時候就會發生沒有反應的狀況。

所以就變成說:

1.Searchbar 會先接到 Today 傳過來的 unit，這個值跟目前 Showinfo 上面的單位應該要是一樣的(只是一個是單字一個是單位)，所以這時候不能去 display 他(事實上 Searchbar 也不負責顯示這個東東)。

2.Searchbar 要提供一個 text input 跟一個 select input 跟一個 Check Button 給 user:
->Text input:這邊要顯示目前的 Location，讓 user 可以輸入新的 location，按下 button 後可以停在新的 location，這個沒什麼問題。

->Select input:這裡要顯示目前攝氏或華式的"單位"，讓 user 可以選下一個想查的單位，送出後要用 props.setUnit 把新的單位送回去。
這裡是比較有問題的地方。

首先，因為一旦將單位送回去，Today 那邊更新之後馬上就會 render 給 Showinfo，所以如果太早送的話，user 按下 select 之後上面的 Showingo 也會馬上跟著動，這樣不行。

再來，目前的做法是 maintain 另外一個 local variable "tmp"，他會記錄"現在 user 選的單位"，也就是隨著 select input 裡面的值去更動。等到 button 送出後，才會在 handleClick 這個 function 裡面用 tmp 的值去 setUnit。
所以在 select 的 onChange 上，並不是 call setUnit，而是 setTmp。
(到這裡所有和單位有關的 value 都是用"單字"來儲存，只有 select input 要顯示給 user 看的地方是用單位)

不過這邊會有一個問題，是我在 handleClick 這邊把 setUnit 和 getWeather 包在一起，這樣的問題會是，我在按下 button 時，getWeather 吃到的還會是舊的 unit，所以我要再按一次 button 他才會吃到正確的 unit(好眼熟的狀況)。
寫到這邊的時候因為一些操作失誤，把 API 的額度用完了，現在沒辦法繼續寫，等 cd 過了再繼續。

---

CD 完了。
真的是對 Open Weather 這個網站感到很抱歉，他們幾乎每天都要因為我 API 額度爆掉寄信給我。

後來的做法是，我把單字跟單位分別存在 Today 裡面的兩個 state，"unit"跟"graph"。
我如果把這兩個東西寫在一起，那在 Searchbar 這邊 setUnit 的時候，因為 state(也就是 unit)有更動，它會自動去做 rerender，所以 Searchbar 這邊一按下去，Showinfo 那邊就會跟著改變，看起來會超奇怪。

而我一開始嘗試把單字存在 unit state，單位存在一個 variable "graph"，在 getWeather 裡面按照 unit(因為這時候的 unit 是從 Searchbar 傳回來的，已經是正確的值)去改動他，然後再把他傳給 Showinfo(rerender)。
結果發現不管怎麼跑，Showinfo 裡面接到的值都是固定的，明明在 Today 這邊看是對的，但接到的值都是固定的。
最後嘗試把 graph 改成 state，然後一樣在 getWeather 裡面做更動，就可以了。

---

喔第一階段還有最後一個小東西要弄。

現在在 user 一開始進入網頁時，顯示的會是台北的天氣，也就是 location state 的預設值，但實際上要想符合使用情境的話，應該要顯示 user current location 才對，所以要把這部分做進去。

邏輯很簡單:
先向 user 索取他目前的位置
->用 navigator.geolocation 抓到 user 的經緯度
->套上 API request，取得 user 的經緯度的天氣
->接上已經寫好的東西

不過遇到一個有趣的狀況(有趣嗎?我因為這個半夜一點還沒睡):

我設計的流程是這樣:

```
const [geo, setGeo] = useState({ lon: 0, lat: 0 });
```

geo state 用來存經緯度，基本上只會使用到這一次。

```
useEffect(() => {
    initialWeather();
  }, []);
```

網頁最一開始被 render 的時候會先 call 一次 initialWeather 這個 function，這邊原本是放 getWeather，用意是不要讓 user 一打開網頁看到空白的東西，現在放 initialWeather 是為了要去 render user 目前所在位置的天氣。

```
const initialWeather = () => {
    // this will render initial page when user get in website for the first time
    console.log("start get location");
    getLocation();
    console.log("init lat: " + geo.lat + " " + "inti lon: " + geo.lon);
    Axios.get(
```

(Axios.get 下面就是在做 getWeather 差不多的事情，就不講了)
initialWeather 做兩件事:
1.call getLocation() 2.做跟 getWeather 一樣的事情，只是變成用經緯度去發 request

這邊在開發的時候加了兩個 console.log，因為有一些神奇的事情會發生，後面再說。

```
const getLocation = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(getLonandLat);
    else Alert("Geolocation is not supported!");
  };
```

getLocation 這邊就是用內建的 method 去抓 user 的經緯度，然後 Call getLonandLat()

```
function getLonandLat(position) {
    console.log("lat: " + parseInt(position.coords.latitude));
    console.log("lon: " + parseInt(position.coords.longitude));
    setGeo({
      lon: parseInt(position.coords.longitude),
      lat: parseInt(position.coords.latitude),
    });
    console.log(
      "after setGeo lat: " + geo.lat + " " + "after setGeo lon: " + geo.lon
    );
  }
```

getLonandLat 會接一個 position，也就是剛剛 getLocation 傳進來的 response。
這裡的話其實只要做 setGeo 就好，也就是把 user 的經緯度傳到 geo state。

但神奇的事情來了。

我腦中想像的流程應該像我上面列的那樣:
initialWeather->getLocation->getLonandLat->setGeo->getWeather

但實際上最後一步拿到 response 的時候呢，打開 data 裡面的經緯度來看，兩個都是 0!為什麼會這樣呢?

於是我在各種地方加了 console.log，想嘗試找出問題在哪，結果發現:
如果把上面那些 console.log 照順序列出來，應該會長得像

```
console.log("start get location");

console.log("lat: " + parseInt(position.coords.latitude));
console.log("lon: " + parseInt(position.coords.longitude));

console.log(
      "after setGeo lat: " + geo.lat + " " + "after setGeo lon: " + geo.lon
    );

console.log("init lat: " + geo.lat + " " + "inti lon: " + geo.lon);
```

這樣子才對。
但實際上的卻是:

```
console.log("start get location");

console.log("init lat: " + geo.lat + " " + "inti lon: " + geo.lon);

console.log("lat: " + parseInt(position.coords.latitude));
console.log("lon: " + parseInt(position.coords.longitude));

console.log(
      "after setGeo lat: " + geo.lat + " " + "after setGeo lon: " + geo.lon
    );
```

太扯了吧!順序整個亂掉欸!
也就是說，call initialWeather 之後，印出了"start get location"。
然後在進去 getLocation 之前，他先印了 getLocation 下面那些東東，之後才進去 getLocation 跟 getLonandLat。
這就是為什麼我後面在送 request 的時候經緯度都會是 0，感覺像是 React render 的時候的一些小特性(?)。

目前想到的可能是:
React 會把一些小的改動 bundle 到一起去 render，主要是為了效能，因為都是在同一個 component 裡面所以"應該"不是 async 的問題。
可能要換個寫法試試看。

---

後來不管我怎麼調整順序都沒辦法，即便我在 setGeo 之後再 call initialWeather，這個時候抓到的 geo state 還是最一開始的值。
所以我想說，反正這個經緯度只會用到一次，就不設成一個 state 了，我讓 initialWeather 多吃兩個參數"lon"、"lat"，也就是經緯度，然後在 getLonandLat 裡面 call initialWeather，並且把經緯度傳進去。
所以有時候用 state 寫不一定是好事，簡單的小事用最直接的方式寫可能更好。

---

到這邊第一階段算是完成了，應該佔整體的 35%左右。
第二階段要寫 Forecast，應該算是相對簡單輕鬆。

---

然後要開始寫 Forecast 的時候遇到一個狀況:
因為 Forecast 這邊也要有單位的功能，而這個單位必須和 Today 同步，所以簡單來說就是我必須把原本寫在 Today 裡面的功能往上拉到 APP，也就是 Today 和 Forecast 的 ancestor，這樣 Today 和 Forecast 才能共享同一個 unit。
