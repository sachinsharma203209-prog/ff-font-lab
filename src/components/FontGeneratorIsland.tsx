import { useState, useCallback } from 'react';

interface FontStyle {
  id: string;
  name: string;
  category: string;
  map: Record<string, string>;
}

const cp = String.fromCodePoint;

function buildMap(upperStart: number, lowerStart: number, digitStart?: number): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    map[String.fromCharCode(65 + i)] = cp(upperStart + i);
    map[String.fromCharCode(97 + i)] = cp(lowerStart + i);
  }
  if (digitStart !== undefined) {
    for (let i = 0; i < 10; i++) {
      map[String.fromCharCode(48 + i)] = cp(digitStart + i);
    }
  }
  return map;
}

const FONT_STYLES: FontStyle[] = [
  {
    id: 'boldSans',
    name: 'Bold Sans',
    category: 'bold',
    map: buildMap(0x1D5D4, 0x1D622, 0x1D7EC)
  },
  {
    id: 'italic',
    name: 'Italic',
    category: 'italic',
    map: {
      '0': cp(0x1D7E2), '1': cp(0x1D7E3), '2': cp(0x1D7E4), '3': cp(0x1D7E5),
      '4': cp(0x1D7E6), '5': cp(0x1D7E7), '6': cp(0x1D7E8), '7': cp(0x1D7E9),
      '8': cp(0x1D7EA), '9': cp(0x1D7EB),
      'A': cp(0x1D434), 'B': cp(0x1D435), 'C': cp(0x1D436), 'D': cp(0x1D437),
      'E': cp(0x1D438), 'F': cp(0x1D439), 'G': cp(0x1D43A), 'H': cp(0x1D43B),
      'I': '\u2110', 'J': cp(0x1D43D),
      'K': cp(0x1D43E), 'L': cp(0x1D43F), 'M': cp(0x1D440), 'N': cp(0x1D441),
      'O': '\u2112', 'P': cp(0x1D443),
      'Q': cp(0x1D444), 'R': cp(0x1D445), 'S': cp(0x1D446), 'T': cp(0x1D447),
      'U': cp(0x1D448), 'V': cp(0x1D449), 'W': cp(0x1D44A), 'X': cp(0x1D44B),
      'Y': '\u212E', 'Z': cp(0x1D44D),
      'a': cp(0x1D44E), 'b': cp(0x1D44F), 'c': cp(0x1D450), 'd': cp(0x1D451),
      'e': cp(0x1D452), 'f': cp(0x1D453), 'g': cp(0x1D454), 'h': '\u210E',
      'i': cp(0x1D456), 'j': cp(0x1D457),
      'k': cp(0x1D458), 'l': cp(0x1D459), 'm': cp(0x1D45A), 'n': cp(0x1D45B),
      'o': cp(0x1D45C), 'p': cp(0x1D45D), 'q': cp(0x1D45E), 'r': cp(0x1D45F),
      's': cp(0x1D460), 't': cp(0x1D461), 'u': cp(0x1D462), 'v': cp(0x1D463),
      'w': cp(0x1D464), 'x': cp(0x1D465), 'y': cp(0x1D466), 'z': cp(0x1D467)
    }
  },
  {
    id: 'boldItalic',
    name: 'Bold Italic',
    category: 'italic',
    map: {
      '0': cp(0x1D7F6), '1': cp(0x1D7F7), '2': cp(0x1D7F8), '3': cp(0x1D7F9),
      '4': cp(0x1D7FA), '5': cp(0x1D7FB), '6': cp(0x1D7FC), '7': cp(0x1D7FD),
      '8': cp(0x1D7FE), '9': cp(0x1D7FF),
      'A': cp(0x1D468), 'B': cp(0x1D469), 'C': cp(0x1D46A), 'D': cp(0x1D46B),
      'E': cp(0x1D46C), 'F': cp(0x1D46D), 'G': cp(0x1D46E), 'H': cp(0x1D46F),
      'I': '\u2111', 'J': cp(0x1D471),
      'K': cp(0x1D472), 'L': cp(0x1D473), 'M': cp(0x1D474), 'N': cp(0x1D475),
      'O': '\u2113', 'P': cp(0x1D477),
      'Q': cp(0x1D478), 'R': cp(0x1D479), 'S': cp(0x1D47A), 'T': cp(0x1D47B),
      'U': cp(0x1D47C), 'V': cp(0x1D47D), 'W': cp(0x1D47E), 'X': cp(0x1D47F),
      'Y': '\u212E', 'Z': cp(0x1D481),
      'a': cp(0x1D482), 'b': cp(0x1D483), 'c': cp(0x1D484), 'd': cp(0x1D485),
      'e': cp(0x1D486), 'f': cp(0x1D487), 'g': cp(0x1D488), 'h': cp(0x1D489),
      'i': cp(0x1D48A), 'j': cp(0x1D48B),
      'k': cp(0x1D48C), 'l': cp(0x1D48D), 'm': cp(0x1D48E), 'n': cp(0x1D48F),
      'o': cp(0x1D490), 'p': cp(0x1D491), 'q': cp(0x1D492), 'r': cp(0x1D493),
      's': cp(0x1D494), 't': cp(0x1D495), 'u': cp(0x1D496), 'v': cp(0x1D497),
      'w': cp(0x1D498), 'x': cp(0x1D499), 'y': cp(0x1D49A), 'z': cp(0x1D49B)
    }
  },
  {
    id: 'cursive',
    name: 'Cursive',
    category: 'script',
    map: {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      'A': cp(0x1D49C), 'B': '\u212C', 'C': cp(0x1D49E), 'D': cp(0x1D49F),
      'E': cp(0x1D4A2), 'F': '\u2131', 'G': cp(0x1D4A4), 'H': cp(0x1D4A7),
      'I': cp(0x1D4A8), 'J': '\u2112',
      'K': cp(0x1D4AA), 'L': cp(0x1D4AB), 'M': cp(0x1D4AC), 'N': cp(0x1D4AD),
      'O': '\u2112', 'P': cp(0x1D4AF),
      'Q': cp(0x1D4B0), 'R': cp(0x1D4B1), 'S': cp(0x1D4B2), 'T': cp(0x1D4B3),
      'U': cp(0x1D4B4), 'V': cp(0x1D4B5), 'W': '\u212E',
      'X': cp(0x1D4B3), 'Y': cp(0x1D4B4), 'Z': cp(0x1D4B5),
      'a': cp(0x1D4B6), 'b': cp(0x1D4B7), 'c': cp(0x1D4B8), 'd': cp(0x1D4B9),
      'e': cp(0x1D4BA), 'f': cp(0x1D4BB), 'g': cp(0x1D4BC),
      'h': cp(0x1D4BD), 'i': cp(0x1D4BE), 'j': cp(0x1D4BF),
      'k': cp(0x1D4C0), 'l': cp(0x1D4C1), 'm': cp(0x1D4C2), 'n': cp(0x1D4C3),
      'o': cp(0x1D4C4), 'p': cp(0x1D4C5), 'q': cp(0x1D4C6), 'r': cp(0x1D4C7),
      's': cp(0x1D4C8), 't': cp(0x1D4C9), 'u': cp(0x1D4CA), 'v': cp(0x1D4CB),
      'w': cp(0x1D4CC), 'x': cp(0x1D4CD), 'y': cp(0x1D4CE), 'z': cp(0x1D4CF)
    }
  },
  {
    id: 'boldScript',
    name: 'Bold Script',
    category: 'script',
    map: {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      ...buildMap(0x1D4D0, 0x1D4EA)
    }
  },
  {
    id: 'fraktur',
    name: 'Gothic',
    category: 'gothic',
    map: {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      'A': cp(0x1D504), 'B': cp(0x1D505), 'C': '\u212D', 'D': cp(0x1D507),
      'E': cp(0x1D508), 'F': cp(0x1D509), 'G': cp(0x1D50A), 'H': cp(0x1D50B),
      'I': cp(0x1D50C), 'J': '\u2111',
      'K': cp(0x1D50E), 'L': cp(0x1D50F), 'M': cp(0x1D510), 'N': cp(0x1D511),
      'O': cp(0x1D512), 'P': cp(0x1D513), 'Q': cp(0x1D514),
      'R': cp(0x1D516), 'S': cp(0x1D517), 'T': cp(0x1D518),
      'U': cp(0x1D519), 'V': cp(0x1D51A), 'W': cp(0x1D51B), 'X': cp(0x1D51C),
      'Y': '\u212C', 'Z': cp(0x1D51B),
      'a': cp(0x1D51E), 'b': cp(0x1D51F), 'c': cp(0x1D520), 'd': cp(0x1D521),
      'e': cp(0x1D522), 'f': cp(0x1D523), 'g': cp(0x1D524), 'h': cp(0x1D525),
      'i': cp(0x1D526), 'j': cp(0x1D527),
      'k': cp(0x1D528), 'l': cp(0x1D529), 'm': cp(0x1D52A), 'n': cp(0x1D52B),
      'o': cp(0x1D52C), 'p': cp(0x1D52D), 'q': cp(0x1D52E), 'r': cp(0x1D52F),
      's': cp(0x1D530), 't': cp(0x1D531), 'u': cp(0x1D532), 'v': cp(0x1D533),
      'w': cp(0x1D534), 'x': cp(0x1D535), 'y': cp(0x1D536), 'z': cp(0x1D537)
    }
  },
  {
    id: 'boldFraktur',
    name: 'Bold Gothic',
    category: 'gothic',
    map: {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      ...buildMap(0x1D56C, 0x1D586)
    }
  },
  {
    id: 'doubleStruck',
    name: 'Double-Struck',
    category: 'bold',
    map: {
      '0': cp(0x1D7D8), '1': cp(0x1D7D9), '2': cp(0x1D7DA), '3': cp(0x1D7DB),
      '4': cp(0x1D7DC), '5': cp(0x1D7DD), '6': cp(0x1D7DE), '7': cp(0x1D7DF),
      '8': cp(0x1D7E0), '9': cp(0x1D7E1),
      'A': cp(0x1D538), 'B': cp(0x1D539), 'C': '\u2102', 'D': cp(0x1D53B),
      'E': cp(0x1D53C), 'F': cp(0x1D53D), 'G': cp(0x1D53E), 'H': '\u210D',
      'I': cp(0x1D540), 'J': cp(0x1D541),
      'K': cp(0x1D542), 'L': cp(0x1D543), 'M': cp(0x1D544), 'N': '\u2115',
      'O': cp(0x1D546), 'P': cp(0x1D547),
      'Q': cp(0x1D548), 'R': cp(0x1D549), 'S': cp(0x1D54A), 'T': cp(0x1D54B),
      'U': cp(0x1D54C), 'V': cp(0x1D54D), 'W': cp(0x1D54E), 'X': cp(0x1D54F),
      'Y': cp(0x1D550),
      'a': cp(0x1D552), 'b': cp(0x1D553), 'c': cp(0x1D554), 'd': cp(0x1D555),
      'e': cp(0x1D556), 'f': cp(0x1D557), 'g': cp(0x1D558), 'h': cp(0x1D559),
      'i': cp(0x1D55A), 'j': cp(0x1D55B),
      'k': cp(0x1D55C), 'l': cp(0x1D55D), 'm': cp(0x1D55E), 'n': cp(0x1D55F),
      'o': cp(0x1D560), 'p': cp(0x1D561), 'q': cp(0x1D562), 'r': cp(0x1D563),
      's': cp(0x1D564), 't': cp(0x1D565), 'u': cp(0x1D566), 'v': cp(0x1D567),
      'w': cp(0x1D568), 'x': cp(0x1D569), 'y': cp(0x1D56A), 'z': cp(0x1D56B)
    }
  },
  {
    id: 'monospace',
    name: 'Monospace',
    category: 'monospace',
    map: buildMap(0x1D670, 0x1D68A, 0x1D7F6)
  },
  {
    id: 'sansSerif',
    name: 'Sans-Serif',
    category: 'sans',
    map: buildMap(0x1D5A0, 0x1D5BA, 0x1D7E2)
  },
  {
    id: 'smallCaps',
    name: 'Small Caps',
    category: 'decorative',
    map: {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E',
      'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J',
      'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O',
      'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T',
      'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z',
      'a': '\u1D00', 'b': '\u0299', 'c': '\u1D04', 'd': '\u1D05',
      'e': '\u1D07', 'f': '\uA730', 'g': '\u0262', 'h': '\u029C',
      'i': '\u026A', 'j': '\u1D0A',
      'k': '\u1D0B', 'l': '\u029F', 'm': '\u1D0D', 'n': '\u1D0E',
      'o': '\u1D0F', 'p': '\u1D18', 'q': '\uA7AF', 'r': '\u0280',
      's': '\uA731', 't': '\u1D1B', 'u': '\u1D1C', 'v': '\u1D20',
      'w': '\u1D21', 'x': '\u1D22', 'y': '\u1D23', 'z': '\uA728'
    }
  },
  {
    id: 'circled',
    name: 'Circled',
    category: 'enclosed',
    map: buildMap(0x24B6, 0x24D0, 0x2460)
  },
  {
    id: 'squared',
    name: 'Squared',
    category: 'enclosed',
    map: {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      ...buildMap(0x1F130, 0x1F130)
    }
  },
  {
    id: 'fullwidth',
    name: 'Fullwidth',
    category: 'decorative',
    map: buildMap(0xFF21, 0xFF41, 0xFF10)
  },
  {
    id: 'upsideDown',
    name: 'Upside Down',
    category: 'effects',
    map: {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      'A': '\u1D22', 'B': '\u0183', 'C': '\u0185', 'D': '\u018C', 'E': '\u1D4D',
      'F': '\u0584', 'G': '\u01E1', 'H': '\u0195', 'I': '\u0268', 'J': '\u0279',
      'K': '\u029E', 'L': '\u029F', 'M': '\u1D50', 'N': '\u0274', 'O': '\u00D8',
      'P': '\u1D18', 'Q': '\u0586', 'R': '\u0280', 'S': '\u0253', 'T': '\u01AD',
      'U': '\u028C', 'V': '\u028A', 'W': '\u2038', 'X': '\u02B3', 'Y': '\u027E',
      'Z': '\u1D51',
      'a': '\u0250', 'b': '\u0183', 'c': '\u0183', 'd': '\u018C', 'e': '\u01DD',
      'f': '\u025F', 'g': '\u0183', 'h': '\u0265', 'i': '\u0268', 'j': '\u0279',
      'k': '\u029E', 'l': '\u029F', 'm': '\u026F', 'n': '\u0274',
      'o': '\u00F8', 'p': '\u0278', 'q': '\u0586', 'r': '\u0280',
      's': '\u0253', 't': '\u01AD', 'u': '\u028C', 'v': '\u028A',
      'w': '\u2195', 'x': '\u0279', 'y': '\u027E', 'z': '\u03C5'
    }
  },
  {
    id: 'bubble',
    name: 'Bubble',
    category: 'enclosed',
    map: {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      ...buildMap(0x249C, 0x249C)
    }
  }
];

function convertText(text: string, style: FontStyle): string {
  return Array.from(text).map(char => {
    if (style.map[char]) return style.map[char];
    if (char === ' ') return ' ';
    return char;
  }).join('');
}

interface FontGeneratorProps {
  charLimit?: number;
  charLimitLabel?: string;
  styles?: string[];
  placeholder?: string;
  defaultText?: string;
}

export default function FontGeneratorIsland({
  charLimit,
  charLimitLabel,
  styles: styleFilter,
  placeholder = "Type or paste your text here...",
  defaultText = ""
}: FontGeneratorProps) {
  const [inputText, setInputText] = useState(defaultText);

  const displayStyles = styleFilter
    ? FONT_STYLES.filter(s => styleFilter.includes(s.id))
    : FONT_STYLES;

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }, []);

  const handleClear = () => setInputText('');

  const isOverLimit = charLimit ? inputText.length > charLimit : false;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 w-full mb-4">
        <div className="flex justify-between items-end">
          <label
            className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]"
            style={{ fontFamily: 'JetBrains Mono' }}
          >
            YOUR TEXT
          </label>
          <div className="flex gap-2 items-center">
            {charLimit && (
              <span
                className={`text-[12px] font-medium ${
                  isOverLimit ? 'text-[#ffb4ab]' : 'text-[#4cd7f6]'
                }`}
                style={{ fontFamily: 'JetBrains Mono' }}
              >
                {inputText.length} / {charLimit}
              </span>
            )}
            <button
              onClick={handleClear}
              className="text-[#bcc9cd] hover:text-[#ffb4ab] transition-colors text-[12px] font-medium flex items-center gap-1"
              style={{ fontFamily: 'JetBrains Mono' }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '16px' }}
              >
                backspace
              </span>{' '}
              Clear
            </button>
          </div>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`w-full bg-[#0b1326] text-[#dae2fd] text-[18px] leading-[28px] p-4 rounded-lg border resize-none transition-colors focus:border-[#4cd7f6] focus:outline-none ${
            isOverLimit ? 'border-[#ffb4ab]' : 'border-[#3d494c]'
          }`}
          style={{ fontFamily: 'Inter' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayStyles.map((style) => {
          const previewText = inputText || placeholder;
          const converted = convertText(previewText, style);
          return (
            <div
              key={style.id}
              className="surface-card rounded-lg p-4 flex flex-col gap-2 transition-colors cursor-pointer group"
              onClick={() => handleCopy(converted)}
            >
              <div className="flex justify-between items-center">
                <span
                  className="text-[12px] font-medium bg-[#4cd7f6]/10 text-[#4cd7f6] px-2 py-1 rounded"
                  style={{ fontFamily: 'JetBrains Mono' }}
                >
                  {style.name.toUpperCase()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(converted);
                  }}
                  className="text-[#bcc9cd] group-hover:text-[#4cd7f6] transition-colors"
                  aria-label={`Copy ${style.name}`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    content_copy
                  </span>
                </button>
              </div>
              <p
                className="text-[18px] leading-[28px] text-[#dae2fd] truncate break-words"
                style={{ fontFamily: 'Inter' }}
              >
                {converted}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
