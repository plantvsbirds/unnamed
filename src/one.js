const toBinaryString = (n) => {return n.toString(2)}
const
  table =["aа","AΑ","BΒВ","cϲсⅽ","CϹСⅭ","dԁⅾ","DⅮ","eе","EΕЕᎬ", "gɡ","hһ","HΗН","iі","jϳј","JЈ","KΚК","LⅬ","mⅿ","MΜϺМⅯ","NΝ","oοо","pр","PΡР","QႳ","sѕ","SЅ","TΤТ","vⅴ","wѡ","xхⅹ","XΧХⅩ","YΥҮ","ZΖ","O0ΟО"],
  inDict = (c) => JSON.stringify(table).indexOf(c) > -1

const BitWid = 16,
      Spacer = '1000' + '0000' + '0000' + '0001'
const encode = (origText, uid) => {
  const payload = toBinaryString(parseInt(uid)) + Spacer
  // consume all of origText, try to put in as much copy as possible
  let buffer = '', ans = '', text = origText.split('')
  return text.reduce((above, oldChar) => {
    if (buffer.length == 0) buffer += payload
    let {consumed, char} = match(oldChar, buffer)
    buffer = buffer.slice(consumed)
    return above + (char ? char : oldChar)
  }, '')
}, decode = (encodedText) => {
  return encodedText.split('').reduce((above, char) => {
    return above + lookup(char)
  }, '')
}, match = (c, binarySeq) => {
  const strip = table.filter(t => t.indexOf(c) > -1)[0]
  if (!strip || strip.length <= 1)
    return {
      consumed : 0
    }
  let ans
  strip.split('').forEach((char, i) => {
    bin = toBinaryString(i)
    if (binarySeq.indexOf(bin) == 0)
      ans = {
        consumed : bin.length,
        char
      }
  })
  return ans;
}, lookup = (c) => {
  if (!inDict(c)) return ''
  let ans = ''
  table.forEach(s => {
    let idx = s.indexOf(c)
    if (idx > -1) {
      ans = toBinaryString(idx)
    }
  })
  return ans
}, guess = (input) => {
  let d = decode(input)
  let maxLen = 0, bestSeq = []
  let count = {}
  d.split(Spacer).forEach(l => {
    count[l+''] = count[l+''] ? (count[l+''] + 1) : 1
  })
  let max = 0, ans = ''
  Object.keys(count).forEach(k => {
    if (count[k] > max) {
      max = count[k]
      ans = k
    }
  })
  return parseInt(ans,2)
}

const app = new Vue ({
  el: '#app',
  data: {
    origText : 
`“Use well your time! It flies so swiftly from us;
But time through order may be won, I promise.
So, Friend (my views to briefly sum),
First, the collegium logicum.
There will your mind be drilled and braced,
As if in Spanish boots 'twere laced,
And thus, to graver paces brought,
'Twill plod along the path of thought,
Instead of shooting here and there,
A will-o'-the-wisp in murky air.
Days will be spent to bid you know,
What once you did at a single blow,
Like eating and drinking, free and strong,—
That one, two, three! thereto belong.
Truly the fabric of mental fleece
Resembles a weaver's masterpiece,
Where a thousand threads one treadle throws,
Where fly the shuttles hither and thither.
Unseen the threads are knit together.
And an infinite combination grows.
Then, the philosopher steps in
And shows, no otherwise it could have been:
The first was so, the second so,
Therefore the third and fourth are so;
Were not the first and second, then
The third and fourth had never been.
The scholars are everywhere believers,
But never succeed in being weavers.
He who would study organic existence,
First drives out the soul[…]”

Excerpt From: Johann Wolfgang von Goethe. “Faust.” iBooks. https://itun.es/us/JuGvD.l
`,
    userName : Math.round (1 + Math.random()*65534),
    testChar : 'Α',
    testText : 'e',
    testBin  : '01010101011',
    testOrigText : 'opaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaqueopaque',
    testOrigBin  : '2',
    userInput : '',
  },
  methods  : {
    lookup, encode, decode, match, guess
  },
})