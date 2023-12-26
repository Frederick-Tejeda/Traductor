import { useState } from 'react'
import './App.css'

var prev = '', prevRange = '';
const API_KEY = "f926bd8046msh8fc4f7d8a15079fp1abd39jsndcb95e31d843";

const languages = [
    {long: "English", short: "en"}, {long: "Spanish", short: "es"}, {long: "Afrikaans", short: "af"}, {long: "Albanian", short: "sq"},
    {long: "Amharic", short: "am"}, {long: "Arabic", short: "ar"}, {long: "Armenian", short: "hy"}, {long: "Assamese", short: "as"},
    {long: "Azerbaijani (Latin)", short: "az"}, {long: "Bangla", short: "bn"}, {long: "Bashkir", short: "ba"}, {long: "Basque", short: "eu"},
    {long: "Bhojpuri", short: "bho"}, {long: "Bodo", short: "brx"}, {long: "Bosnian (Latin)", short: "bs"}, {long: "Bulgarian", short: "bg"},
    {long: "Cantonese (Traditional)", short: "yue"}, {long: "Catalan", short: "ca"}, {long: "Chinese (Literary)", short: "lzh"},
    {long: "Chinese Simplified", short: "zh-Hans"}, {long: "Chinese Traditional", short: "zh-Hant"}, {long: "chiShona", short: "sn"},
    {long: "Croatian", short: "hr"}, {long: "Czech", short: "cs"}, {long: "Danish", short: "da"}, {long: "Dari", short: "prs"},
    {long: "Divehi", short: "dv"}, {long: "Dogri", short: "doi"}, {long: "Dutch", short: "nl"}, {long: "Estonian", short: "et"},
    {long: "Faroese", short: "fo"}, {long: "Fijian", short: "fj"}, {long: "Filipino", short: "fil"}, {long: "Finnish", short: "fi"},
    {long: "French", short: "fr"}, {long: "French (Canada)", short: "fr-ca"}, {long: "Galician", short: "gl"}, {long: "Georgian", short: "ka"},
    {long: "German", short: "de"}, {long: "Greek", short: "el"}, {long: "Gujarati", short: "gu"}, {long: "Haitian Creole", short: "ht"},
    {long: "Hausa", short: "ha"}, {long: "Hebrew", short: "he"}, {long: "Hindi", short: "hi"}, {long: "Hmong Daw (Latin)", short: "mww"},
    {long: "Hungarian", short: "hu"}, {long: "Icelandic", short: "is"}, {long: "Igbo", short: "ig"}, {long: "Indonesian", short: "id"},
    {long: "Inuinnaqtun", short: "ikt"}, {long: "Inuktitut", short: "iu"}, {long: "Inuktitut (Latin)", short: "iu-Latn"},
    {long: "Irish", short: "ga"}, {long: "Italian", short: "it"}, {long: "Japanese", short: "ja"}, {long: "Kannada", short: "kn"},
    {long: "Kashmiri", short: "ks"}, {long: "Kazakh", short: "kk"}, {long: "Khmer", short: "km"}, {long: "Kinyarwanda", short: "rw"},
    {long: "Klingon", short: "tlh-Latn"}, {long: "Klingon (plqaD)", short: "tlh-Piqd"}, {long: "Konkani", short: "gom"},
    {long: "Korean", short: "ko"}, {long: "Kurdish (Central)", short: "ku"}, {long: "Kurdish (Northern)", short: "kmr"},
    {long: "Kyrgyz (Cyrillic)", short: "ky"}, {long: "Lao", short: "lo"}, {long: "Latvian", short: "lv"}, {long: "Lithuanian", short: "lt"},
    {long: "Lingala", short: "ln"}, {long: "Lower Sorbian", short: "dsb"}, {long: "Luganda", short: "lug"}, {long: "Macedonian", short: "mk"},
    {long: "Maithili", short: "mai"}, {long: "Malagasy", short: "mg"}, {long: "Malay (Latin)", short: "ms"}, {long: "Malayalam", short: "ml"},
    {long: "Maltese", short: "mt"}, {long: "Maori", short: "mi"}, {long: "Marathi", short: "mr"}, {long: "Mongolian (Cyrillic)", short: "mn-Cyrl"}, {long: "Mongolian (Traditional)", short: "mn-Mong"}, {long: "Myanmar", short: "my"}, {long: "Nepali", short: "ne"},
    {long: "Norwegian", short: "nb"}, {long: "Nyanja", short: "	nya"}, {long: "Odia", short: "or"}, {long: "Pashto", short: "ps"},
    {long: "Persian", short: "fa"}, {long: "Polish", short: "pl"}, {long: "Portuguese (Brazil)", short: "pt"},
    {long: "Portuguese (Portugal)", short: "pt-pt"}, {long: "Punjabi", short: "pa"}, {long: "Queretaro Otomi", short: "otq"},
    {long: "Romanian", short: "ro"}, {long: "Rundi", short: "run"}, {long: "Russian", short: "ru"}, {long: "Samoan (Latin)", short: "sm"},
    {long: "Serbian (Cyrillic)", short: "sr-Cyrl"}, {long: "Serbian (Latin)", short: "sr-Latn"}, {long: "Sesotho", short: "st"},
    {long: "Sesotho sa Leboa", short: "nso"}, {long: "Setswana", short: "tn"}, {long: "Sindhi", short: "sd"}, {long: "Sinhala", short: "si"},
    {long: "Slovak", short: "sk"}, {long: "Slovenian", short: "sl"}, {long: "Somali (Arabic)", short: "so"}, {long: "Swahili (Latin)", short: "sw"}, {long: "Swedish", short: "sv"}, {long: "Tahitian", short: "ty"}, {long: "Tamil", short: "ta"}, {long: "Tatar (Latin)", short: "tt"},
    {long: "Telugu", short: "te"}, {long: "Thai", short: "th"}, {long: "Tibetan", short: "bo"},{ long: "Tigrinya", short: "ti"},
    {long: "Tongan", short: "to"}, {long: "Turkish", short: "tr"}, {long: "Turkmen (Latin)", short: "tk"}, {long: "Ukrainian", short: "uk"},
    {long: "Upper Sorbian", short: "hsb"}, {long: "Urdu", short: "ur"}, {long: "Uyghur (Arabic)", short: "ug"},
    {long: "Uzbek (Latin)", short: "uz"}, {long: "Vietnamese", short: "vi"}, {long: "Welsh", short: "cy"}, {long: "Xhosa", short: "xh"},
    {long: "Yoruba", short: "yo"}, {long: "Yucatec Maya", short: "yua"}, {long: "Zulu", short: "zu"}
]

function App() {
  const [outputText, setOutputText] = useState("")
  const [inputLang, setInputLang] = useState("")
  const [outputLang, setOutputLang] = useState("en")

    async function apiRequest(text, outputLang, inputLang = "") {
        await fetch("https://microsoft-translator-text.p.rapidapi.com/translate?to="
            + outputLang +
            "&api-version=3.0&"
            + inputLang +
            "profanityAction=NoAction&textType=plain", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-rapidapi-key": API_KEY,
                    "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com"
                },
                body: JSON.stringify([{ "text": text }])
            }
            ).then(response => response.json())
		    .then(response => setOutputText(response[0].translations[0].text))
		    .catch(err => console.error(err));
    }

    async function Translate(e) {
        let inputText = e.target.value;
        apiRequest(inputText.toString(), outputLang, inputLang);
    }

  return (
    <>
      <main>
        <section>
            <select value={inputLang} onChange={(e) => setInputLang(e.target.value)} size="1">
                <option value="">Detect language</option>
                {languages.map((lang, key) => (<option key={key} value={lang.short}>{lang.long}</option>))}
            </select>
            <textarea onKeyUp={(e) => Translate(e)} />
        </section>
        <section>
            <select value={outputLang} onChange={(e) => setOutputLang(e.target.value)} size="1">
                {languages.map((lang, key) => (<option key={key} value={lang.short}>{lang.long}</option>))}
            </select>
            <textarea onClick={() => navigator.clipboard.writeText(outputText).then(() => console.log('copied')).catch((err) => console.error(err))} readOnly defaultValue={outputText} />
        </section>
      </main>
    </>
  )
}

export default App
