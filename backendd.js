import { default as __WEBPACK_EXTERNAL_MODULE_https_testingcf_jsdelivr_net_npm_dedent_esm_422736dc_default__ } from "https://testingcf.jsdelivr.net/npm/dedent/+esm";

var __webpack_require__ = {};

(() =&gt; {
  __webpack_require__.n = module =&gt; {
    var getter = module &amp;&amp; module.__esModule ? () =&gt; module["default"] : () =&gt; module;
    __webpack_require__.d(getter, {
      a: getter
    });
    return getter;
  };
})();

(() =&gt; {
  __webpack_require__.d = (exports, definition) =&gt; {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) &amp;&amp; !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key]
        });
      }
    }
  };
})();

(() =&gt; {
  __webpack_require__.o = (obj, prop) =&gt; Object.prototype.hasOwnProperty.call(obj, prop);
})();

var __webpack_exports__ = {};

const external_namespaceObject = _;

var external_default = __webpack_require__.n(external_namespaceObject);

const external_z_namespaceObject = z;

const PreprocessStringifiedObject = schema =&gt; external_z_namespaceObject.z.preprocess(val =&gt; {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }
  return val;
}, schema);

const TimeUnitSchema = external_z_namespaceObject.z.enum([ "period", "day", "week", "month", "season", "year" ]);

const ForgettingRuleSchema = external_z_namespaceObject.z.object({
  triggerFlag: external_z_namespaceObject.z.string(),
  decrease: external_z_namespaceObject.z.number()
});

const AffectionStageWithForgetSchema = external_z_namespaceObject.z.object({
  threshold: external_z_namespaceObject.z.number(),
  name: external_z_namespaceObject.z.string(),
  describe: external_z_namespaceObject.z.string().nullable().optional(),
  patienceUnit: TimeUnitSchema.optional(),
  visit: external_z_namespaceObject.z.object({
    enabled: external_z_namespaceObject.z.boolean().optional(),
    probBase: external_z_namespaceObject.z.number().optional(),
    probK: external_z_namespaceObject.z.number().optional(),
    coolUnit: TimeUnitSchema.optional()
  }).optional(),
  forgettingSpeed: external_z_namespaceObject.z.array(PreprocessStringifiedObject(ForgettingRuleSchema)).optional(),
  affectionGrowthLimit: external_z_namespaceObject.z.object({
    max: external_z_namespaceObject.z.number(),
    divisor: external_z_namespaceObject.z.number()
  }).optional()
}).passthrough();

const ActionSchema = external_z_namespaceObject.z.object({
  do: external_z_namespaceObject.z.string(),
  to: external_z_namespaceObject.z.string().optional(),
  from: external_z_namespaceObject.z.string().optional(),
  source: external_z_namespaceObject.z.string().optional()
});

const EntrySchema = external_z_namespaceObject.z.object({
  when: external_z_namespaceObject.z.any(),
  action: ActionSchema,
  priority: external_z_namespaceObject.z.number().optional()
});

const EntryListSchema = external_z_namespaceObject.z.array(EntrySchema);

const EntryListPreprocessSchema = external_z_namespaceObject.z.array(PreprocessStringifiedObject(EntrySchema));

const CharacterSettingsSchema = external_z_namespaceObject.z.object({
  id: external_z_namespaceObject.z.string(),
  name: external_z_namespaceObject.z.string(),
  affectionStages: external_z_namespaceObject.z.array(AffectionStageWithForgetSchema),
  specials: EntryListPreprocessSchema,
  routine: EntryListPreprocessSchema
});

const CharacterSettingsMapSchema = external_z_namespaceObject.z.record(external_z_namespaceObject.z.string(), CharacterSettingsSchema);

const CharacterSchema = external_z_namespaceObject.z.object({
  name: external_z_namespaceObject.z.string(),
  pic: external_z_namespaceObject.z.string().optional(),
  "Độ Hảo Cảm": external_z_namespaceObject.z.number(),
  "Khu Vực Hiện Tại": external_z_namespaceObject.z.string().nullable(),
  "Khu Vực Sinh Sống": external_z_namespaceObject.z.string().nullable(),
  affectionStages: external_z_namespaceObject.z.array(PreprocessStringifiedObject(AffectionStageWithForgetSchema)).default([]),
  specials: EntryListPreprocessSchema.default([]),
  routine: EntryListPreprocessSchema.default([]),
  "Mục Tiêu": external_z_namespaceObject.z.string().optional(),
  "Tình Trạng Cơ Thể": external_z_namespaceObject.z.string().optional(),
  "Suy Nghĩ Nội Tâm": external_z_namespaceObject.z.string().optional()
});

const CharsSchema = external_z_namespaceObject.z.object({
  $meta: external_z_namespaceObject.z.any().optional()
}).catchall(CharacterSchema);

const CHARACTER_FIELDS = {
  affection: "Độ Hảo Cảm",
  currentLocation: "Khu Vực Hiện Tại",
  home: "Khu Vực Sinh Sống"
};

function pickAffectionStage(affection, stages) {
  if (!stages || stages.length === 0) {
    return undefined;
  }
  const sortedStages = external_default().orderBy(stages, [ "threshold" ], [ "desc" ]);
  for (const stage of sortedStages) {
    if (affection &gt;= stage.threshold) {
      return stage;
    }
  }
  return sortedStages[sortedStages.length - 1];
}

const ChangeLogEntrySchema = external_z_namespaceObject.z.object({
  module: external_z_namespaceObject.z.string(),
  path: external_z_namespaceObject.z.string(),
  oldValue: external_z_namespaceObject.z.any(),
  newValue: external_z_namespaceObject.z.any(),
  reason: external_z_namespaceObject.z.string()
});

const ChangeLogSchema = external_z_namespaceObject.z.array(ChangeLogEntrySchema);

const createChangeLogEntry = (module, path, oldValue, newValue, reason) =&gt; {
  const entry = {
    module,
    path,
    oldValue,
    newValue,
    reason
  };
  return ChangeLogEntrySchema.parse(entry);
};

const TIME_PERIOD_NAMES = [ "Sáng sớm", "Buổi sáng", "Buổi trưa", "Buổi chiều", "Hoàng hôn", "Buổi tối", "Nửa đêm đầu", "Nửa đêm về sáng" ];

const TIME_PERIOD_KEYS = [ "newDawn", "newMorning", "newNoon", "newAfternoon", "newDusk", "newNight", "newFirstHalfNight", "newSecondHalfNight" ];

const TIME_SEASON_NAMES = [ "Xuân", "Hạ", "Thu", "Đông" ];

const TIME_SEASON_KEYS = [ "newSpring", "newSummer", "newAutumn", "newWinter" ];

const TIME_WEEK_NAMES = [ "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật" ];

const PROJECT_NAME = "GSKO-BASE";

const DEBUG_CONFIG_LS_KEY = "gsko_era_debug_config";

let enabledPatterns = [];

let disabledPatterns = [];

function loadDebugConfig() {
  try {
    const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
    const config = JSON.parse(configStr);
    const toRegex = p =&gt; new RegExp(`${p.replace(/\*/g, ".*")}`);
    enabledPatterns = (config.enabled || []).map(toRegex);
    disabledPatterns = (config.disabled || []).map(toRegex);
  } catch (e) {
    console.error(`《${PROJECT_NAME}-Log》: Tải cấu hình debug thất bại.`, e);
    enabledPatterns = [];
    disabledPatterns = [];
  }
}

function isDebugEnabled(moduleName) {
  if (!moduleName) return false;
  if (disabledPatterns.some(re =&gt; re.test(moduleName))) {
    return false;
  }
  if (enabledPatterns.length === 0) {
    return false;
  }
  if (enabledPatterns.some(re =&gt; re.test(moduleName))) {
    return true;
  }
  return false;
}

function updateConfig(newConfig) {
  const uniqueConfig = {
    enabled: [ ...new Set(newConfig.enabled) ],
    disabled: [ ...new Set(newConfig.disabled) ]
  };
  globalThis.localStorage?.setItem(DEBUG_CONFIG_LS_KEY, JSON.stringify(uniqueConfig));
  loadDebugConfig();
  console.log(`%c《${PROJECT_NAME}-Log》Chế độ debug đã được cập nhật.`, "color: #3498db; font-weight: bold;", {
    "Kích hoạt (Enabled)": uniqueConfig.enabled,
    "Vô hiệu hóa (Disabled)": uniqueConfig.disabled
  });
}

loadDebugConfig();

if (typeof globalThis !== "undefined") {
  const eraDebug = {
    add(pattern) {
      const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
      const config = JSON.parse(configStr);
      const enabled = new Set(config.enabled || []);
      const disabled = new Set(config.disabled || []);
      enabled.add(pattern);
      disabled.delete(pattern);
      updateConfig({
        enabled: Array.from(enabled),
        disabled: Array.from(disabled)
      });
    },
    remove(pattern) {
      const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
      const config = JSON.parse(configStr);
      const enabled = new Set(config.enabled || []);
      const disabled = new Set(config.disabled || []);
      disabled.add(pattern);
      enabled.delete(pattern);
      updateConfig({
        enabled: Array.from(enabled),
        disabled: Array.from(disabled)
      });
    },
    status() {
      const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
      const config = JSON.parse(configStr);
      console.log(`%c《${PROJECT_NAME}-Log》Cấu hình debug hiện tại:`, "color: #3498db; font-weight: bold;", config);
    },
    clear() {
      updateConfig({
        enabled: [],
        disabled: []
      });
    }
  };
  globalThis.eraDebug = eraDebug;
}

const logContext = {
  mk: ""
};

class Logger {
  moduleName;
  constructor(...[moduleName]) {
    const maybeModuleName = moduleName;
    const injectedModuleName = typeof maybeModuleName === "string" ? maybeModuleName : undefined;
    this.moduleName = injectedModuleName || this._getModuleNameFromStack() || "unknown";
  }
  _getModuleNameFromStack() {
    try {
      const stack = (new Error).stack || "";
      const callerLine = stack.split("\n").find(line =&gt; (line.includes(`/src/${PROJECT_NAME}/`) || line.includes(`/dist/${PROJECT_NAME}/`) || line.includes(`\\src\\${PROJECT_NAME}\\`) || line.includes(`\\dist\\${PROJECT_NAME}\\`)) &amp;&amp; !line.includes("/utils/log.ts"));
      if (!callerLine) {
        return null;
      }
      const match = callerLine.match(new RegExp(`(src|dist)[\\\\/]${PROJECT_NAME}[\\\\/]([^?:]+)`));
      if (!match || !match[2]) {
        return null;
      }
      const path = match[2];
      return path.replace(/\\/g, "/").replace(/\.(vue|ts|js)$/, "").replace(/\/index$/, "");
    } catch (e) {
      console.error(`《${PROJECT_NAME}-Log-Debug》: 解析模块名时发生意外错误。`, e);
      return null;
    }
  }
  formatMessage(funcName, message) {
    const mkString = logContext.mk ? `（${logContext.mk}）` : "";
    return `《${PROJECT_NAME}》${mkString}「${this.moduleName}」【${funcName}】${String(message)}`;
  }
  debug(funcName, message, obj) {
    if (!isDebugEnabled(this.moduleName)) {
      return;
    }
    const formattedMessage = this.formatMessage(funcName, message);
    if (obj !== undefined) {
      console.debug(formattedMessage, obj);
    } else {
      console.debug(formattedMessage);
    }
  }
  log(funcName, message, obj) {
    const formattedMessage = this.formatMessage(funcName, message);
    if (obj !== undefined) {
      console.log(`%c${formattedMessage}`, "color: #3498db;", obj);
    } else {
      console.log(`%c${formattedMessage}`, "color: #3498db;");
    }
  }
  warn(funcName, message, obj) {
    const formattedMessage = this.formatMessage(funcName, message);
    if (obj !== undefined) {
      console.warn(`%c${formattedMessage}`, "color: #f39c12;", obj);
    } else {
      console.warn(`%c${formattedMessage}`, "color: #f39c12;");
    }
  }
  error(funcName, message, errorObj) {
    const formattedMessage = this.formatMessage(funcName, message);
    if (errorObj !== undefined) {
      console.error(`%c${formattedMessage}`, "color: #e74c3c; font-weight: bold;", errorObj);
    } else {
      console.error(`%c${formattedMessage}`, "color: #e74c3c; font-weight: bold;");
    }
  }
}

const logger = new Logger("GSKO-BASE/utils/format");

function firstVal(x) {
  return Array.isArray(x) ? x.length ? x[0] : "" : x;
}

function get(obj, path, fallback = "") {
  try {
    const ks = Array.isArray(path) ? path : String(path).split(".");
    let cur = obj;
    for (const k of ks) {
      if (!cur || typeof cur !== "object" || !(k in cur)) {
        logger.debug("get", "Không tìm thấy key, sử dụng giá trị mặc định.", {
          路径: String(path),
          缺失键: String(k),
          默认值: fallback
        });
        return fallback;
      }
      cur = cur[k];
    }
    const v = firstVal(cur);
    if (v == null) {
      logger.debug("get", "Đường dẫn tồn tại nhưng giá trị rỗng (null/undefined), sử dụng giá trị mặc định.", {
        路径: String(path),
        默认值: fallback
      });
      return fallback;
    }
    return v;
  } catch (e) {
    logger.error("get", "Ngoại lệ, sử dụng giá trị mặc định.", {
      路径: String(path),
      异常: String(e),
      默认值: fallback
    });
    return fallback;
  }
}

function format_text(id, raw) {
  const el = document.getElementById(id);
  if (!el) {
    logger.warn("text", "Phần tử đích không tồn tại, bỏ qua ghi.", {
      元素ID: id
    });
    return;
  }
  el.textContent = toText(raw);
}

function getRaw(obj, path, fallback = null) {
  try {
    const ks = Array.isArray(path) ? path : String(path).split(".");
    let cur = obj;
    for (const k of ks) {
      if (!cur || typeof cur !== "object" || !(k in cur)) {
        return fallback;
      }
      cur = cur[k];
    }
    return cur == null ? fallback : cur;
  } catch (e) {
    logger.error("getRaw", "Ngoại lệ, sử dụng giá trị mặc định.", {
      路径: String(path),
      异常: String(e),
      默认值: fallback
    });
    return fallback;
  }
}

function toText(v) {
  if (v == null || v === "") return "—";
  if (Array.isArray(v)) return v.length ? v.join("；") : "—";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

function getStr(obj, path, fallback = "") {
  const rawValue = getRaw(obj, path, null);
  if (rawValue === null) {
    return toText(fallback);
  }
  return toText(rawValue);
}

function formatTime(clock) {
  if (!clock) return "Thời gian không xác định";
  const year = clock.yearID;
  const month = clock.monthID % 100;
  const day = clock.dayID % 100;
  const periodName = TIME_PERIOD_NAMES[clock.periodIdx] || "Khoảng thời gian không xác định";
  return `Ngày ${day} tháng ${month} năm ${year}, ${periodName}`;
}

function toFiniteNumber(value) {
  if (typeof value === "number" &amp;&amp; Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" &amp;&amp; value.trim().length &gt; 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return null;
}

const mkValueSchema = external_z_namespaceObject.z.string().nullable();

const PeriodAnchorSchema = external_z_namespaceObject.z.object({
  newDawn: mkValueSchema,
  newMorning: mkValueSchema,
  newNoon: mkValueSchema,
  newAfternoon: mkValueSchema,
  newDusk: mkValueSchema,
  newNight: mkValueSchema,
  newFirstHalfNight: mkValueSchema,
  newSecondHalfNight: mkValueSchema
}).partial().default({});

const SeasonAnchorSchema = external_z_namespaceObject.z.object({
  newSpring: mkValueSchema,
  newSummer: mkValueSchema,
  newAutumn: mkValueSchema,
  newWinter: mkValueSchema
}).partial().default({});

const TimeChatMkAnchorsSchema = external_z_namespaceObject.z.object({
  newPeriod: mkValueSchema,
  period: PeriodAnchorSchema,
  newDay: mkValueSchema,
  newWeek: mkValueSchema,
  newMonth: mkValueSchema,
  newSeason: mkValueSchema,
  season: SeasonAnchorSchema,
  newYear: mkValueSchema
}).partial().default({});

const createEmptyAnchors = () =&gt; ({});

const TimeChatMkSyncCacheSchema = external_z_namespaceObject.z.object({
  anchors: TimeChatMkAnchorsSchema.optional()
}).optional().default(() =&gt; ({
  anchors: createEmptyAnchors()
}));

const TimeChatMkSyncRuntimeSchema = external_z_namespaceObject.z.object({
  anchors: TimeChatMkAnchorsSchema.optional()
}).optional().default(() =&gt; ({
  anchors: createEmptyAnchors()
}));

const BY_PERIOD_KEYS = TIME_PERIOD_KEYS;

const BY_SEASON_KEYS = TIME_SEASON_KEYS;

const ClockAckSchema = external_z_namespaceObject.z.object({
  dayID: external_z_namespaceObject.z.number(),
  weekID: external_z_namespaceObject.z.number(),
  monthID: external_z_namespaceObject.z.number(),
  yearID: external_z_namespaceObject.z.number(),
  periodID: external_z_namespaceObject.z.number(),
  periodIdx: external_z_namespaceObject.z.number(),
  seasonID: external_z_namespaceObject.z.number(),
  seasonIdx: external_z_namespaceObject.z.number()
});

const NowSchema = external_z_namespaceObject.z.object({
  iso: external_z_namespaceObject.z.string(),
  year: external_z_namespaceObject.z.number(),
  month: external_z_namespaceObject.z.number(),
  day: external_z_namespaceObject.z.number(),
  weekdayIndex: external_z_namespaceObject.z.number(),
  weekdayName: external_z_namespaceObject.z.string(),
  periodName: external_z_namespaceObject.z.string(),
  periodIdx: external_z_namespaceObject.z.number(),
  minutesSinceMidnight: external_z_namespaceObject.z.number(),
  seasonName: external_z_namespaceObject.z.string(),
  seasonIdx: external_z_namespaceObject.z.number(),
  hour: external_z_namespaceObject.z.number(),
  minute: external_z_namespaceObject.z.number(),
  hm: external_z_namespaceObject.z.string()
});

const ClockFlagsSchema = external_z_namespaceObject.z.object({
  newPeriod: external_z_namespaceObject.z.boolean(),
  byPeriod: external_z_namespaceObject.z.object({
    newDawn: external_z_namespaceObject.z.boolean(),
    newMorning: external_z_namespaceObject.z.boolean(),
    newNoon: external_z_namespaceObject.z.boolean(),
    newAfternoon: external_z_namespaceObject.z.boolean(),
    newDusk: external_z_namespaceObject.z.boolean(),
    newNight: external_z_namespaceObject.z.boolean(),
    newFirstHalfNight: external_z_namespaceObject.z.boolean(),
    newSecondHalfNight: external_z_namespaceObject.z.boolean()
  }),
  newDay: external_z_namespaceObject.z.boolean(),
  newWeek: external_z_namespaceObject.z.boolean(),
  newMonth: external_z_namespaceObject.z.boolean(),
  newSeason: external_z_namespaceObject.z.boolean(),
  bySeason: external_z_namespaceObject.z.object({
    newSpring: external_z_namespaceObject.z.boolean(),
    newSummer: external_z_namespaceObject.z.boolean(),
    newAutumn: external_z_namespaceObject.z.boolean(),
    newWinter: external_z_namespaceObject.z.boolean()
  }),
  newYear: external_z_namespaceObject.z.boolean()
});

const CLOCK_ROOT_FLAG_KEYS = [ "newPeriod", "newDay", "newWeek", "newMonth", "newSeason", "newYear" ];

const ClockSchema = external_z_namespaceObject.z.object({
  now: NowSchema,
  flags: ClockFlagsSchema,
  mkAnchors: TimeChatMkAnchorsSchema.optional(),
  previousMkAnchors: TimeChatMkAnchorsSchema.optional()
});

const EMPTY_NOW = {
  iso: "",
  year: 0,
  month: 0,
  day: 0,
  weekdayIndex: 0,
  weekdayName: "",
  periodName: "",
  periodIdx: 0,
  minutesSinceMidnight: 0,
  seasonName: "",
  seasonIdx: 0,
  hour: 0,
  minute: 0,
  hm: ""
};

const EMPTY_FLAGS = {
  newPeriod: false,
  byPeriod: {
    newDawn: false,
    newMorning: false,
    newNoon: false,
    newAfternoon: false,
    newDusk: false,
    newNight: false,
    newFirstHalfNight: false,
    newSecondHalfNight: false
  },
  newDay: false,
  newWeek: false,
  newMonth: false,
  newSeason: false,
  bySeason: {
    newSpring: false,
    newSummer: false,
    newAutumn: false,
    newWinter: false
  },
  newYear: false
};

const MODULE_NAME = "affection-forgetting-processor";

const clockFlagKeys = ClockFlagsSchema.keyof().enum;

const TRIGGER_FLAG_PREFIX_KEYS = {
  BY_PERIOD: clockFlagKeys.byPeriod,
  BY_SEASON: clockFlagKeys.bySeason
};

const FLAG_PREFIX = {
  BY_PERIOD: `${TRIGGER_FLAG_PREFIX_KEYS.BY_PERIOD}.`,
  BY_SEASON: `${TRIGGER_FLAG_PREFIX_KEYS.BY_SEASON}.`
};

const UserSchema = external_z_namespaceObject.z.object({
  "Họ Tên": external_z_namespaceObject.z.string().nullable(),
  "Thân phận": external_z_namespaceObject.z.string().nullable(),
  "Giới Tính": external_z_namespaceObject.z.string().nullable(),
  "Tuổi Tác": external_z_namespaceObject.z.string().nullable(),
  "Năng Lực Đặc Biệt": external_z_namespaceObject.z.string().nullable(),
  "Khu Vực Hiện Tại": external_z_namespaceObject.z.string().nullable(),
  "Khu Vực Sinh Sống": external_z_namespaceObject.z.string().nullable(),
  "Trải Nghiệm Quan Trọng": external_z_namespaceObject.z.union([ external_z_namespaceObject.z.string(), external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()) ]).optional().nullable(),
  "Mối Quan Hệ": external_z_namespaceObject.z.union([ external_z_namespaceObject.z.string(), external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()) ]).optional().nullable()
});

const USER_FIELDS = {
  name: "Họ Tên",
  identity: "Thân phận",
  gender: "Giới Tính",
  age: "Tuổi Tác",
  abilities: "Năng Lực Đặc Biệt",
  currentLocation: "Khu Vực Hiện Tại",
  home: "Khu Vực Sinh Sống",
  events: "Trải nghiệm quan trọng",
  relationships: "Mối quan hệ"
};

const getClock = runtime =&gt; runtime.clock;

const getClockFlags = runtime =&gt; runtime.clock?.flags;

const getMkAnchors = runtime =&gt; runtime.clock?.mkAnchors;

const getCharacterSettings = runtime =&gt; runtime.characterSettings;

const getClockFlagValue = (runtime, flagKey) =&gt; {
  const flags = getClockFlags(runtime);
  if (!flags) {
    return false;
  }
  return external_default().get(flags, flagKey) === true;
};

const getAnchorMkByFlag = (runtime, flagKey) =&gt; {
  const mkAnchors = getMkAnchors(runtime);
  if (!mkAnchors) {
    return null;
  }
  if (flagKey.startsWith(FLAG_PREFIX.BY_PERIOD)) {
    const periodKey = flagKey.slice(FLAG_PREFIX.BY_PERIOD.length);
    return external_default().get(mkAnchors, [ TRIGGER_FLAG_PREFIX_KEYS.BY_PERIOD, periodKey ]) ?? null;
  }
  if (flagKey.startsWith(FLAG_PREFIX.BY_SEASON)) {
    const seasonKey = flagKey.slice(FLAG_PREFIX.BY_SEASON.length);
    return external_default().get(mkAnchors, [ TRIGGER_FLAG_PREFIX_KEYS.BY_SEASON, seasonKey ]) ?? null;
  }
  const rootFlagKey = flagKey;
  if (rootFlagKey in mkAnchors) {
    const mk = mkAnchors[rootFlagKey];
    return typeof mk === "string" ? mk : null;
  }
  return null;
};

const getCharacters = stat =&gt; stat.chars;

const getCharacter = (stat, charId) =&gt; stat.chars?.[charId];

const getCharacterAffection = (stat, charId) =&gt; {
  const char = getCharacter(stat, charId);
  return toFiniteNumber(char?.[CHARACTER_FIELDS.affection]);
};

const getUser = stat =&gt; stat.user;

const getUserLocation = stat =&gt; getUser(stat)?.[USER_FIELDS.currentLocation];

const getCharacterLocation = (stat, charId) =&gt; {
  const char = getCharacter(stat, charId);
  return char?.[CHARACTER_FIELDS.currentLocation];
};

const getSnapshotUserLocation = snapshot =&gt; {
  const state = snapshot.statWithoutMeta ?? snapshot.stat;
  if (!state) return undefined;
  return getUserLocation(state);
};

const getSnapshotCharacterLocation = (snapshot, charId) =&gt; {
  const state = snapshot.statWithoutMeta ?? snapshot.stat;
  if (!state) return undefined;
  return getCharacterLocation(state, charId);
};

const parseForgettingRule = entry =&gt; {
  const result = ForgettingRuleSchema.safeParse(entry);
  return result.success ? result.data : null;
};

const processor_logger = new Logger("GSKO-BASE/core/affection-forgetting-processor/processor");

const hasSharedLocation = (snapshots, charId) =&gt; snapshots.some(snapshot =&gt; {
  const userLocation = getSnapshotUserLocation(snapshot);
  const charLocation = getSnapshotCharacterLocation(snapshot, charId);
  return userLocation &amp;&amp; charLocation &amp;&amp; userLocation === charLocation;
});

const sumChangeValue = rules =&gt; external_default().sumBy(rules, entry =&gt; {
  const value = toFiniteNumber(entry.rule.decrease);
  return value &amp;&amp; value &gt; 0 ? value : 0;
});

async function processAffectionForgettingInternal({stat, runtime, mk, selectedMks}) {
  const funcName = "processAffectionForgetting";
  processor_logger.debug(funcName, "--- Bắt đầu xử lý quên lãng hảo cảm ---", {
    mk
  });
  const changes = [];
  const clock = getClock(runtime);
  const characterSettings = getCharacterSettings(runtime);
  if (!clock?.flags || !clock.mkAnchors) {
    processor_logger.debug(funcName, "Thiếu dữ liệu clock, bỏ qua xử lý quên lãng.");
    return {
      stat,
      runtime,
      changes
    };
  }
  if (!characterSettings || !stat.chars) {
    processor_logger.debug(funcName, "Thiếu cấu hình nhân vật hoặc dữ liệu stat, bỏ qua xử lý quên lãng.");
    return {
      stat,
      runtime,
      changes
    };
  }
  if (!mk || !selectedMks) {
    processor_logger.debug(funcName, "Thiếu thông tin mk / selectedMks, bỏ qua xử lý quên lãng.");
    return {
      stat,
      runtime,
      changes
    };
  }
  const validSelectedMks = new Set((selectedMks ?? []).filter(value =&gt; typeof value === "string" &amp;&amp; value.length &gt; 0));
  if (validSelectedMks.size === 0) {
    processor_logger.debug(funcName, "Không có MK hợp lệ nào trong selectedMks, bỏ qua xử lý quên lãng.");
    return {
      stat,
      runtime,
      changes
    };
  }
  const activeCharacters = [];
  const requiredFlags = new Set;
  for (const [charId, settings] of Object.entries(characterSettings)) {
    const affectionValue = getCharacterAffection(stat, charId);
    if (affectionValue == null) continue;
    const stage = pickAffectionStage(affectionValue, settings.affectionStages);
    const parsedRules = (stage?.forgettingSpeed ?? []).map(parseForgettingRule).filter(rule =&gt; Boolean(rule));
    if (parsedRules.length === 0) continue;
    const rules = [];
    for (const rule of parsedRules) {
      if (!getClockFlagValue(runtime, rule.triggerFlag)) continue;
      rules.push({
        flagKey: rule.triggerFlag,
        rule
      });
      requiredFlags.add(rule.triggerFlag);
    }
    if (rules.length &gt; 0) {
      activeCharacters.push({
        charId,
        affection: affectionValue,
        rules
      });
    }
  }
  if (activeCharacters.length === 0 || requiredFlags.size === 0) {
    processor_logger.debug(funcName, "Hiện tại không có nhân vật nào kích hoạt quy tắc quên lãng.");
    return {
      stat,
      runtime,
      changes
    };
  }
  processor_logger.debug(funcName, `[Bước 2] Thu thập được ${activeCharacters.length} nhân vật cần xử lý.`);
  const snapshots = runtime.snapshots ?? [];
  if (snapshots.length === 0) {
    processor_logger.debug(funcName, "runtime.snapshots trống, không thể xác định tình huống cùng khu vực.");
    return {
      stat,
      runtime,
      changes
    };
  }
  processor_logger.debug(funcName, `[Bước 3] Lấy được ${snapshots.length} snapshot lịch sử từ runtime.`);
  for (const context of activeCharacters) {
    const {charId, affection, rules} = context;
    const anchorMk = getAnchorMkByFlag(runtime, rules[0].flagKey);
    if (!anchorMk || !validSelectedMks.has(anchorMk)) {
      processor_logger.debug(funcName, `Neo của nhân vật ${charId} không hợp lệ hoặc không nằm trong chuỗi tin nhắn chính, bỏ qua.`);
      continue;
    }
    const shared = hasSharedLocation(snapshots, charId);
    processor_logger.debug(funcName, `[Bước 4] Kiểm tra vị trí của nhân vật ${charId} và người chơi...`, {
      hasSharedLocation: shared
    });
    if (shared) {
      processor_logger.debug(funcName, `Nhân vật ${charId} ở cùng khu vực với người chơi trong khoảng thời gian này, bỏ qua quên lãng.`);
      continue;
    }
    const changeValue = sumChangeValue(rules);
    if (changeValue <= 0) continue;
    let newAffection;
    let operation = "Bất biến";
    if (affection &gt; 0) {
      newAffection = Math.max(0, affection - changeValue);
      if (newAffection < affection) operation = "Giảm";
    } else if (affection < 0) {
      newAffection = Math.min(0, affection + changeValue);
      if (newAffection &gt; affection) operation = "Tăng";
    } else {
      continue;
    }
    newAffection = Math.round(newAffection);
    if (operation === "Bất biến" || newAffection === affection) continue;
    const char = stat.chars?.[charId];
    if (!char) continue;
    char[CHARACTER_FIELDS.affection] = newAffection;
    const reason = `Không ở cùng khu vực với người chơi trong khoảng thời gian ${rules.map(item =&gt; item.flagKey).join(", ")}, độ hảo cảm hướng về 0, đã ${operation} ${changeValue}`;
    const path = `chars.${charId}.${CHARACTER_FIELDS.affection}`;
    changes.push(createChangeLogEntry("affection-forgetting-processor", path, affection, newAffection, reason));
    processor_logger.debug(funcName, "Áp dụng quy tắc quên lãng khiến độ hảo cảm hướng về 0.", {
      charId,
      oldAffection: affection,
      newAffection,
      changeValue,
      operation,
      activeFlags: rules.map(item =&gt; item.flagKey)
    });
  }
  processor_logger.debug(funcName, "--- Xử lý quên lãng hảo cảm hoàn tất ---");
  return {
    stat,
    runtime,
    changes
  };
}

async function processAffectionForgetting({stat, runtime, mk, selectedMks, currentMessageId}) {
  return processAffectionForgettingInternal({
    stat,
    runtime,
    mk,
    selectedMks,
    currentMessageId
  });
}

const editLog_logger = new Logger("GSKO-BASE/utils/editLog");

function parseEditLogString(logString) {
  try {
    const parsed = JSON.parse(logString);
    if (external_default().isArray(parsed)) {
      return parsed;
    }
    editLog_logger.warn("parseEditLogString", "Kết quả phân tích không phải là một mảng.", {
      parsed
    });
    return null;
  } catch (error) {
    editLog_logger.error("parseEditLogString", "Phân tích chuỗi editLog thất bại.", {
      error: error.message
    });
    return null;
  }
}

function getUpdateOps(logJson) {
  return logJson.filter(op =&gt; op.op === "update");
}

function getInsertOps(logJson) {
  return logJson.filter(op =&gt; op.op === "insert");
}

function getDeleteOps(logJson) {
  return logJson.filter(op =&gt; op.op === "delete");
}

function flattenObject(obj, path = "") {
  const flatMap = new Map;
  if (!external_default().isObject(obj) || external_default().isArray(obj)) {
    if (path) flatMap.set(path, obj);
    return flatMap;
  }
  const recordObj = obj;
  for (const key of Object.keys(recordObj)) {
    const newPath = path ? `${path}.${key}` : key;
    const nested = flattenObject(recordObj[key], newPath);
    nested.forEach((value, p) =&gt; flatMap.set(p, value));
  }
  return flatMap;
}

function getAtomicChangesFromUpdate(updateOp) {
  if (updateOp.op !== "update") return [];
  const basePath = updateOp.path;
  const oldVal = updateOp.value_old;
  const newVal = updateOp.value_new;
  if (!external_default().isObject(oldVal) &amp;&amp; !external_default().isObject(newVal)) {
    return [ {
      path: basePath,
      oldVal: oldVal ?? null,
      newVal: newVal ?? null
    } ];
  }
  const oldMap = flattenObject(oldVal);
  const newMap = flattenObject(newVal);
  const allKeys = external_default().union([ ...oldMap.keys() ], [ ...newMap.keys() ]);
  const changes = [];
  for (const key of allKeys) {
    const fullPath = `${basePath}.${key}`;
    const vOld = oldMap.has(key) ? oldMap.get(key) : null;
    const vNew = newMap.has(key) ? newMap.get(key) : null;
    if (!external_default().isEqual(vOld, vNew)) {
      changes.push({
        path: fullPath,
        oldVal: vOld,
        newVal: vNew
      });
    }
  }
  return changes;
}

function getAllAtomicChanges(logJson) {
  const allChanges = [];
  getUpdateOps(logJson).forEach(op =&gt; {
    allChanges.push(...getAtomicChangesFromUpdate(op));
  });
  getInsertOps(logJson).forEach(op =&gt; {
    const valueToInsert = op.value_new;
    if (valueToInsert === undefined) return;
    if (!_.isObject(valueToInsert)) {
      allChanges.push({
        path: op.path,
        oldVal: null,
        newVal: valueToInsert
      });
    } else {
      const newMap = flattenObject(valueToInsert);
      if (newMap.size === 0 &amp;&amp; _.isObject(valueToInsert)) {
        allChanges.push({
          path: op.path,
          oldVal: null,
          newVal: valueToInsert
        });
      } else {
        newMap.forEach((vNew, key) =&gt; {
          allChanges.push({
            path: `${op.path}.${key}`,
            oldVal: null,
            newVal: vNew
          });
        });
      }
    }
  });
  getDeleteOps(logJson).forEach(op =&gt; {
    const valueToDelete = op.value_old;
    if (valueToDelete === undefined) return;
    if (!_.isObject(valueToDelete)) {
      allChanges.push({
        path: op.path,
        oldVal: valueToDelete,
        newVal: null
      });
    } else {
      const oldMap = flattenObject(valueToDelete);
      if (oldMap.size === 0 &amp;&amp; _.isObject(valueToDelete)) {
        allChanges.push({
          path: op.path,
          oldVal: valueToDelete,
          newVal: null
        });
      } else {
        oldMap.forEach((vOld, key) =&gt; {
          allChanges.push({
            path: `${op.path}.${key}`,
            oldVal: vOld,
            newVal: null
          });
        });
      }
    }
  });
  return allChanges;
}

function findChangeByPath(logJson, targetPath) {
  const allChanges = getAllAtomicChanges(logJson);
  for (let i = allChanges.length - 1; i &gt;= 0; i--) {
    if (allChanges[i].path === targetPath) {
      return allChanges[i];
    }
  }
  return null;
}

const PATH_RE = new RegExp(`^chars.[^.]+.${CHARACTER_FIELDS.affection}$`);

const isTarget = path =&gt; PATH_RE.test(String(path || ""));

function getCurrentAffectionStage(affection, stages) {
  return pickAffectionStage(affection, stages);
}

const affection_processor_processor_logger = new Logger("GSKO-BASE/core/affection-processor/processor");

function processAffection({stat, editLog, runtime}) {
  const funcName = "processAffection";
  const changes = [];
  const internalLogs = [];
  if (!editLog) {
    affection_processor_processor_logger.debug(funcName, "editLog không tồn tại, bỏ qua xử lý.");
    return {
      stat,
      changes
    };
  }
  const logJson = typeof editLog === "string" ? parseEditLogString(editLog) : editLog;
  if (!logJson) {
    affection_processor_processor_logger.warn(funcName, "Phân tích editLog thất bại, bỏ qua xử lý.");
    return {
      stat,
      changes
    };
  }
  const updateOps = getUpdateOps(logJson);
  if (updateOps.length === 0) {
    affection_processor_processor_logger.debug(funcName, "Không tìm thấy thao tác update, bỏ qua xử lý.");
    return {
      stat,
      changes
    };
  }
  affection_processor_processor_logger.debug(funcName, `Tìm thấy ${updateOps.length} thao tác update, bắt đầu xử lý...`);
  for (const op of updateOps) {
    const atomicChanges = getAtomicChangesFromUpdate(op);
    for (const change of atomicChanges) {
      const {path, oldVal, newVal} = change;
      try {
        if (!isTarget(path)) {
          continue;
        }
        const charId = path.split(".")[1];
        if (!charId) {
          continue;
        }
        const character = stat.chars[charId];
        if (!character) {
          internalLogs.push({
            msg: "Không tìm thấy nhân vật trong stat.chars",
            path,
            charId
          });
          continue;
        }
        const baseAffection = character[CHARACTER_FIELDS.affection];
        const hasOld = !(oldVal === null || oldVal === undefined);
        const oldValueNum = hasOld ? Number(oldVal) : baseAffection;
        const newValueNum = Number(newVal);
        if (!Number.isFinite(oldValueNum) || !Number.isFinite(newValueNum)) {
          internalLogs.push({
            msg: "Bất thường kiểu dữ liệu: old/new không phải là số hợp lệ, từ bỏ xử lý",
            path,
            oldVal,
            newVal
          });
          continue;
        }
        if (!hasOld) {
          internalLogs.push({
            msg: "Gợi ý: thiếu old, xử lý gán giá trị đầu tiên bằng 0",
            path,
            asOld: 0
          });
        }
        const delta = newValueNum - oldValueNum;
        const absDelta = Math.abs(delta);
        let finalDelta = delta;
        internalLogs.push({
          msg: "Bắt được cập nhật biến",
          path,
          old: oldValueNum,
          new: newValueNum,
          delta,
          absDelta
        });
        const charSettings = runtime.characterSettings?.[charId];
        const stages = charSettings?.affectionStages;
        if (stages) {
          const currentStage = getCurrentAffectionStage(oldValueNum, stages);
          const limit = currentStage?.affectionGrowthLimit;
          if (limit &amp;&amp; absDelta &gt; limit.max) {
            const limitedAbsDelta = Math.max(absDelta / limit.divisor, limit.max);
            finalDelta = limitedAbsDelta * Math.sign(delta);
            internalLogs.push({
              msg: "Áp dụng giới hạn mềm thay đổi độ hảo cảm",
              originalDelta: delta,
              limit,
              finalDelta
            });
          } else {
            internalLogs.push({
              msg: "Không áp dụng giới hạn mềm (chưa vượt ngưỡng hoặc không có cấu hình)"
            });
          }
        }
        if (finalDelta === delta) {
          internalLogs.push({
            msg: "Giá trị sau khi xử lý không thay đổi, không cần ghi đè"
          });
          continue;
        }
        const finalNewValue = external_default().round(oldValueNum + finalDelta);
        character[CHARACTER_FIELDS.affection] = finalNewValue;
        const atomicPath = `chars.${charId}.${CHARACTER_FIELDS.affection}`;
        const changeEntry = createChangeLogEntry("affection-processor", atomicPath, oldValueNum, finalNewValue, `Xử lý hảo cảm: lượng thay đổi gốc ${delta} bị giới hạn mềm thành ${finalDelta}`);
        changes.push(changeEntry);
        internalLogs.push({
          msg: "Ghi hoàn tất",
          changeEntry
        });
      } catch (err) {
        affection_processor_processor_logger.error(funcName, `处理路径 ${path} 时发生异常`, err.stack || err);
        internalLogs.push({
          msg: "Xử lý bất thường",
          path,
          error: err.stack || err
        });
      }
    }
  }
  if (changes.length &gt; 0) {
    affection_processor_processor_logger.debug(funcName, "Xử lý quy đổi hảo cảm hoàn tất.", {
      summary: `Tổng cộng tạo ra ${changes.length} thay đổi.`,
      internalLogs
    });
  } else {
    affection_processor_processor_logger.debug(funcName, "Xử lý quy đổi hảo cảm hoàn tất, không có thay đổi liên quan.");
  }
  return {
    stat,
    changes
  };
}

const affection_processor_logger = new Logger("GSKO-BASE/core/affection-processor");

function processAffectionDecisions({stat, editLog, runtime}) {
  const funcName = "processAffectionDecisions";
  affection_processor_logger.debug(funcName, "Bắt đầu xử lý độ hảo cảm...");
  try {
    const result = processAffection({
      stat,
      editLog,
      runtime
    });
    affection_processor_logger.debug(funcName, "Xử lý độ hảo cảm hoàn tất.");
    return result;
  } catch (e) {
    affection_processor_logger.error(funcName, "Xảy ra lỗi ngoài ý muốn khi xử lý độ hảo cảm:", e);
    return {
      stat,
      changes: []
    };
  }
}

const MapSizeSchema = external_z_namespaceObject.z.object({
  width: external_z_namespaceObject.z.number(),
  height: external_z_namespaceObject.z.number()
});

const MapPositionSchema = external_z_namespaceObject.z.object({
  x: external_z_namespaceObject.z.number(),
  y: external_z_namespaceObject.z.number()
});

const MapLeafSchema = external_z_namespaceObject.z.object({
  pos: MapPositionSchema,
  htmlEle: external_z_namespaceObject.z.string(),
  aliases: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()).default([])
}).passthrough();

const MapTreeSchema = external_z_namespaceObject.z.lazy(() =&gt; external_z_namespaceObject.z.record(external_z_namespaceObject.z.string(), external_z_namespaceObject.z.union([ MapLeafSchema, MapTreeSchema ])));

const MapGraphSchema = external_z_namespaceObject.z.object({
  mapSize: MapSizeSchema,
  tree: MapTreeSchema,
  edges: external_z_namespaceObject.z.array(PreprocessStringifiedObject(external_z_namespaceObject.z.object({
    a: external_z_namespaceObject.z.string(),
    b: external_z_namespaceObject.z.string()
  }))).optional(),
  aliases: external_z_namespaceObject.z.record(external_z_namespaceObject.z.string(), external_z_namespaceObject.z.array(external_z_namespaceObject.z.string())).optional()
});

const WORLD_DEFAULTS = {
  fallbackPlace: "Đền Hakurei",
  mainStoryTag: "gensokyo"
};

const WorldSchema = external_z_namespaceObject.z.object({
  map_graph: MapGraphSchema.optional(),
  fallbackPlace: external_z_namespaceObject.z.string().default(WORLD_DEFAULTS.fallbackPlace)
}).passthrough();

const timeSchema = external_z_namespaceObject.z.object({
  timeProgress: external_z_namespaceObject.z.number()
}).passthrough();

const graph_builder_logger = new Logger("GSKO-BASE/core/area-processor/graph-builder");

function buildGraph({stat}) {
  const funcName = "buildGraph";
  const graph = {};
  const leafNodes = [];
  const seenNodes = new Set;
  try {
    const mapData = stat.world?.map_graph;
    if (!mapData?.tree) {
      graph_builder_logger.warn(funcName, "stat.world.map_graph.tree trống hoặc không tồn tại.");
      return {
        graph,
        leafNodes
      };
    }
    graph_builder_logger.debug(funcName, "Lấy stat.world.map_graph thành công");
    const addEdge = (nodeA, nodeB) =&gt; {
      if (nodeA === nodeB) return;
      if (!graph[nodeA]) graph[nodeA] = {};
      if (!graph[nodeB]) graph[nodeB] = {};
      graph[nodeA][nodeB] = true;
      graph[nodeB][nodeA] = true;
    };
    const walkTree = node =&gt; {
      for (const key in node) {
        const child = node[key];
        const parseResult = MapLeafSchema.safeParse(child);
        if (parseResult.success) {
          if (!seenNodes.has(key)) {
            leafNodes.push({
              name: key,
              ...parseResult.data,
              aliases: parseResult.data.aliases ?? []
            });
            seenNodes.add(key);
          }
        } else if (child &amp;&amp; typeof child === "object") {
          walkTree(child);
        }
      }
    };
    walkTree(mapData.tree);
    leafNodes.forEach(leaf =&gt; {
      if (!graph[leaf.name]) {
        graph[leaf.name] = {};
      }
    });
    const edges = mapData.edges ?? [];
    graph_builder_logger.debug(funcName, "Các edges được trích xuất từ mapData:", edges);
    if (Array.isArray(edges)) {
      edges.forEach(edge =&gt; {
        if (edge &amp;&amp; edge.a &amp;&amp; edge.b) {
          addEdge(edge.a, edge.b);
        }
      });
    }
  } catch (error) {
    graph_builder_logger.error(funcName, "Lỗi khi xây dựng đồ thị bản đồ", error);
  }
  graph_builder_logger.debug(funcName, "Xây dựng graph hoàn tất");
  graph_builder_logger.debug(funcName, "Xây dựng leafNodes hoàn tất");
  return {
    graph,
    leafNodes
  };
}

const log = new Logger("GSKO-BASE/utils/message");

function getMessageContent(msg) {
  if (!msg) return null;
  let content = null;
  if (typeof msg.mes === "string") {
    content = msg.mes;
  } else if (Array.isArray(msg.swipes)) {
    const sid = Number(msg.swipe_id ?? 0);
    content = msg.swipes[sid] || null;
  } else if (typeof msg.message === "string") {
    content = msg.message;
  }
  if (content === null) {
    return null;
  }
  return content;
}

function escReg(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractContentForMatching(messages, options = {}) {
  const {mainBodyTags = [], excludeBodyTags = []} = options;
  const segs = [];
  for (const m of messages) {
    let messageContent = getMessageContent(m);
    if (messageContent === null) {
      continue;
    }
    if (excludeBodyTags.length &gt; 0) {
      for (const tagName of excludeBodyTags) {
        const safeTagName = escReg(tagName);
        const containerRe = new RegExp(`<${safeTagName}\\b[^&gt;]*&gt;((?:(?!<${safeTagName}\\b)[\\s\\S])*?)</${safeTagName}&gt;`, "gi");
        const selfClosingRe = new RegExp(`<${safeTagName}\\b[^&gt;]*/&gt;`, "gi");
        let oldContent;
        do {
          oldContent = messageContent;
          messageContent = messageContent.replace(containerRe, "");
        } while (oldContent !== messageContent);
        messageContent = messageContent.replace(selfClosingRe, "");
      }
    }
    if (m.role === "user") {
      segs.push(messageContent);
      continue;
    }
    if (mainBodyTags.length &gt; 0) {
      const mainBodySegs = [];
      for (const tagName of mainBodyTags) {
        const safeTagName = escReg(tagName);
        const extractRe = new RegExp(`<${safeTagName}\\b[^&gt;]*&gt;((?:(?!<${safeTagName}\\b)[\\s\\S])*?)</${safeTagName}&gt;`, "gi");
        let match;
        while ((match = extractRe.exec(messageContent)) !== null) {
          mainBodySegs.push(match[1].trim());
        }
      }
      if (mainBodySegs.length &gt; 0) {
        segs.push(mainBodySegs.join("\n"));
      }
    } else {
      segs.push(messageContent);
    }
  }
  const result = segs.join("\n");
  return result;
}

async function matchMessages(keywords, options = {}) {
  const {depth = 5, includeSwipes = false, mainBodyTags, excludeBodyTags} = options;
  const funcName = "matchMessages";
  try {
    if (typeof getChatMessages !== "function") {
      log.warn(funcName, "Hàm getChatMessages không khả dụng, không thể khớp tin nhắn.");
      return [];
    }
    const last = getLastMessageId();
    const begin = Math.max(0, last - (depth - 1));
    const msgs = getChatMessages(`${begin}-${last}`, {
      role: "all",
      hide_state: "all",
      include_swipes: includeSwipes
    });
    const pool = extractContentForMatching(msgs, {
      mainBodyTags,
      excludeBodyTags
    });
    if (!pool) {
      return [];
    }
    log.debug(funcName, `Kho văn bản cần khớp: ${pool}`);
    const hits = [];
    for (const kw of keywords) {
      if (!kw) continue;
      const re = new RegExp(escReg(kw), "i");
      if (re.test(pool)) {
        hits.push(kw);
      }
    }
    return hits;
  } catch (e) {
    log.error(funcName, "Xảy ra ngoại lệ khi khớp tin nhắn hàng loạt", e);
    return [];
  }
}

async function updateMessageContent(message, newContent) {
  const oldContent = getMessageContent(message);
  log.debug("updateMessageContent", "Nội dung tin nhắn trước khi cập nhật:", oldContent);
  log.debug("updateMessageContent", "Nội dung tin nhắn sau khi cập nhật:", newContent);
  const updatePayload = {
    message_id: message.message_id
  };
  if (Array.isArray(message.swipes)) {
    const sid = Number(message.swipe_id ?? 0);
    const newSwipes = [ ...message.swipes ];
    newSwipes[sid] = newContent;
    updatePayload.swipes = newSwipes;
  } else {
    updatePayload.message = newContent;
  }
  await setChatMessages([ updatePayload ], {
    refresh: "none"
  });
}

const location_loader_logger = new Logger("GSKO-BASE/core/area-processor/location-loader");

async function loadLocations({stat, legalLocations, neighbors}) {
  const funcName = "loadLocations";
  let hits = [];
  try {
    if (!legalLocations || legalLocations.length === 0) {
      location_loader_logger.debug(funcName, "Danh sách địa điểm hợp lệ trống, trực tiếp trả về mảng rỗng.");
      return [];
    }
    const legalLocationNames = legalLocations.map(loc =&gt; loc.name);
    const {mainBodyTags, excludeBodyTags} = stat.config;
    const matched = await matchMessages(legalLocationNames, {
      depth: 5,
      includeSwipes: false,
      mainBodyTags: mainBodyTags ?? [ WORLD_DEFAULTS.mainStoryTag ],
      excludeBodyTags
    });
    hits = Array.from(new Set(matched));
    const userLoc = stat.user?.[USER_FIELDS.currentLocation]?.trim() ?? "";
    if (userLoc) {
      location_loader_logger.debug(funcName, `Lấy được vị trí hiện tại của người dùng: ${userLoc}`);
      if (!hits.includes(userLoc) &amp;&amp; legalLocationNames.includes(userLoc)) {
        hits.push(userLoc);
      }
    } else {
      location_loader_logger.debug(funcName, "Không có dữ liệu vị trí hiện tại trong stat.user.");
    }
    if (neighbors &amp;&amp; neighbors.length &gt; 0) {
      for (const neighbor of neighbors) {
        if (!hits.includes(neighbor) &amp;&amp; legalLocationNames.includes(neighbor)) {
          hits.push(neighbor);
        }
      }
      location_loader_logger.debug(funcName, `Danh sách địa điểm sau khi gộp các vùng lân cận: ${JSON.stringify(hits)}`);
    }
    location_loader_logger.debug(funcName, `Địa điểm trúng khớp cuối cùng: ${JSON.stringify(hits)}`);
  } catch (error) {
    location_loader_logger.error(funcName, "Xảy ra ngoại lệ khi tải thông tin địa điểm", error);
    hits = [];
  }
  return external_default().uniq(hits);
}

const neighbor_loader_logger = new Logger("GSKO-BASE/core/area-processor/neighbor-loader");

function processNeighbors({stat, graph}) {
  const funcName = "processNeighbors";
  try {
    const currentUserLocation = stat.user?.[USER_FIELDS.currentLocation] ?? "";
    if (!currentUserLocation) {
      neighbor_loader_logger.debug(funcName, "Vị trí hiện tại của người dùng không xác định, không thể lấy vùng lân cận.");
      return [];
    }
    if (external_default().isEmpty(graph) || !graph[currentUserLocation]) {
      neighbor_loader_logger.debug(funcName, `Không có nút ${currentUserLocation} trong đồ thị hoặc thiếu vùng lân cận.`);
      return [];
    }
    const neighbors = Object.keys(graph[currentUserLocation]);
    neighbor_loader_logger.debug(funcName, `Tìm thấy các vùng lân cận của ${currentUserLocation}: ${neighbors.join(", ")}`);
    return neighbors;
  } catch (error) {
    neighbor_loader_logger.error(funcName, "Xảy ra ngoại lệ khi lấy vùng lân cận", error);
    return [];
  }
}

const utils_logger = new Logger("GSKO-BASE/core/area-processor/utils");

function bfs(source, destination, graph) {
  const funcName = "bfs";
  if (!graph[source] || !graph[destination]) return null;
  const queue = [ source ];
  const previousNode = {
    [source]: null
  };
  let head = 0;
  while (head < queue.length) {
    const currentNode = queue[head++];
    if (currentNode === destination) break;
    const neighbors = graph[currentNode] || {};
    for (const neighbor in neighbors) {
      if (previousNode[neighbor] !== undefined) continue;
      previousNode[neighbor] = currentNode;
      queue.push(neighbor);
    }
  }
  if (previousNode[destination] === undefined) return null;
  const steps = [];
  let currentNode = destination;
  let guard = 0;
  while (previousNode[currentNode] != null &amp;&amp; guard < 1e3) {
    steps.push({
      from: previousNode[currentNode],
      to: currentNode
    });
    currentNode = previousNode[currentNode];
    guard++;
  }
  if (guard &gt;= 1e3) {
    utils_logger.error(funcName, `Rơi vào vòng lặp vô tận khi truy vết ngược đường đi BFS, destination=${destination}`);
    return null;
  }
  steps.reverse();
  return {
    hops: steps.length,
    steps
  };
}

const route_logger = new Logger("GSKO-BASE/core/area-processor/route");

function processRoute({stat, runtime, graph}) {
  const funcName = "processRoute";
  const defaultRouteInfo = {
    candidates: [],
    routes: []
  };
  try {
    const currentUserLocation = stat.user?.[USER_FIELDS.currentLocation] ?? WORLD_DEFAULTS.fallbackPlace;
    route_logger.debug(funcName, `Vị trí hiện tại của người dùng: ${currentUserLocation}`);
    if (external_default().isEmpty(graph)) {
      route_logger.warn(funcName, "Đồ thị trống, không thể tính toán lộ trình.");
      return defaultRouteInfo;
    }
    route_logger.debug(funcName, "Đồ thị đã sẵn sàng", {
      nodes: Object.keys(graph).length
    });
    const candidates = external_default().cloneDeep(runtime.area?.loadArea ?? []);
    route_logger.debug(funcName, `Các địa điểm ứng cử viên cho lộ trình: ${candidates.join(", ")}`);
    if (candidates.length === 0) {
      route_logger.debug(funcName, "Không có địa điểm ứng cử viên, bỏ qua tính toán lộ trình.");
      return defaultRouteInfo;
    }
    const routes = [];
    for (const destination of candidates) {
      if (destination === currentUserLocation) {
        route_logger.debug(funcName, `Điểm đến trùng với vị trí hiện tại, bỏ qua: ${destination}`);
        continue;
      }
      route_logger.debug(funcName, `Tính toán đường đi: Từ ${currentUserLocation} đến ${destination}`);
      const path = bfs(currentUserLocation, destination, graph);
      if (path) {
        route_logger.debug(funcName, `Tìm thấy đường đi: Từ ${currentUserLocation} đến ${destination}`, {
          path
        });
        routes.push({
          destination,
          path
        });
      } else {
        route_logger.debug(funcName, `Không tìm thấy đường đi: Từ ${currentUserLocation} đến ${destination}`);
      }
    }
    const routeInfo = {
      candidates,
      routes
    };
    route_logger.debug(funcName, "Tính toán lộ trình hoàn tất", routeInfo);
    return routeInfo;
  } catch (error) {
    route_logger.error(funcName, "Xảy ra ngoại lệ khi tính toán lộ trình", error);
    return defaultRouteInfo;
  }
}

const area_processor_logger = new Logger("GSKO-BASE/core/area-processor");

async function processArea({stat, runtime}) {
  const funcName = "processArea";
  area_processor_logger.debug(funcName, "Bắt đầu xử lý khu vực...");
  const output = {
    graph: {},
    legal_locations: [],
    neighbors: [],
    loadArea: [],
    route: {
      candidates: [],
      routes: []
    },
    mapSize: undefined
  };
  try {
    output.mapSize = stat.world?.map_graph?.mapSize;
    const {graph, leafNodes: fullLeafNodes} = buildGraph({
      stat
    });
    output.graph = graph;
    area_processor_logger.debug(funcName, `Xây dựng đồ thị hoàn tất, bao gồm ${Object.keys(graph).length} nút.`);
    output.legal_locations = fullLeafNodes;
    area_processor_logger.debug(funcName, `Lấy được ${output.legal_locations.length} khu vực hợp lệ`);
    output.neighbors = processNeighbors({
      stat,
      graph
    });
    area_processor_logger.debug(funcName, `Lấy được ${output.neighbors.length} khu vực lân cận`);
    output.loadArea = await loadLocations({
      stat,
      legalLocations: output.legal_locations,
      neighbors: output.neighbors
    });
    area_processor_logger.debug(funcName, `Cần tải ${output.loadArea.length} khu vực`);
    const tempRuntimeForRoute = {
      area: output
    };
    output.route = processRoute({
      stat,
      runtime: tempRuntimeForRoute,
      graph
    });
    area_processor_logger.debug(funcName, "Tính toán lộ trình hoàn tất");
  } catch (e) {
    area_processor_logger.error(funcName, "Xảy ra ngoại lệ khi xử lý khu vực", e);
  }
  runtime.area = output;
  area_processor_logger.debug(funcName, "Xử lý khu vực hoàn tất");
  return {
    runtime
  };
}

const character_locations_processor_logger = new Logger("GSKO-BASE/core/character-locations-processor");

function processCharacterLocations({stat, runtime}) {
  const funcName = "processCharacterLocations";
  character_locations_processor_logger.debug(funcName, "Bắt đầu xử lý phân bố nhân vật...");
  try {
    const playerLocation = String(character_locations_processor_getUserLocation(stat) ?? "").trim() || null;
    const npcByLocation = {};
    const chars = getChars(stat);
    Object.entries(chars).forEach(([charId, charObj]) =&gt; {
      const key = String(getCharLocation(charObj) ?? "").trim() || "Chưa biết";
      if (!npcByLocation[key]) npcByLocation[key] = [];
      npcByLocation[key].push(charId);
    });
    runtime.characterDistribution = {
      playerLocation,
      npcByLocation
    };
    character_locations_processor_logger.debug(funcName, "Xử lý phân bố nhân vật hoàn tất.", runtime.characterDistribution);
  } catch (error) {
    character_locations_processor_logger.error(funcName, "Xảy ra ngoại lệ khi xử lý phân bố nhân vật", error);
    runtime.characterDistribution = {
      playerLocation: null,
      npcByLocation: {}
    };
  }
  return {
    runtime
  };
}

function character_locations_processor_getUserLocation(stat) {
  return stat.user?.[USER_FIELDS.currentLocation] ?? null;
}

function getChars(stat) {
  return stat.chars ?? {};
}

function getCharLocation(charObj) {
  return String(charObj[CHARACTER_FIELDS.currentLocation] ?? "").trim();
}

const character_log_processor_processor_logger = new Logger("GSKO-BASE/core/character-log-processor/processor");

function processCharacterLogs(runtime) {
  const funcName = "processCharacterLogs";
  character_log_processor_processor_logger.debug(funcName, "Bắt đầu xử lý nhật ký nhân vật...", {
    runtime: (0, external_namespaceObject.cloneDeep)(runtime)
  });
  const {snapshots, clock} = runtime;
  if (!snapshots || snapshots.length === 0 || !clock?.flags || !clock.mkAnchors) {
    character_log_processor_processor_logger.warn(funcName, "Thiếu dữ liệu cần thiết (snapshots, clock.flags, hoặc clock.mkAnchors), quay về sớm.");
    return runtime;
  }
  const mkToIndexMap = new Map;
  snapshots.forEach((snapshot, index) =&gt; {
    mkToIndexMap.set(snapshot.mk, index);
  });
  character_log_processor_processor_logger.debug(funcName, "Tạo mkToIndexMap hoàn tất.", {
    size: mkToIndexMap.size
  });
  const newCharacterLog = {};
  for (const flag of CLOCK_ROOT_FLAG_KEYS) {
    character_log_processor_processor_logger.debug(funcName, `Kiểm tra flag: ${flag}`);
    if (clock.flags[flag]) {
      character_log_processor_processor_logger.debug(funcName, `Xử lý flag được kích hoạt: ${flag}`);
      const startMk = clock.mkAnchors[flag];
      if (!startMk) {
        character_log_processor_processor_logger.debug(funcName, `Không tìm thấy startMk cho flag "${flag}", bỏ qua.`);
        continue;
      }
      const startIndex = mkToIndexMap.get(startMk);
      character_log_processor_processor_logger.debug(funcName, `startMk của flag "${flag}" là "${startMk}", startIndex tìm được là ${startIndex}.`);
      if (startIndex === undefined) {
        character_log_processor_processor_logger.warn(funcName, `Không tìm thấy chỉ mục tương ứng với startMk "${startMk}" trong mkToIndexMap, bỏ qua flag này.`);
        continue;
      }
      const relevantSnapshots = snapshots.slice(startIndex);
      character_log_processor_processor_logger.debug(funcName, `Đã trích xuất ${relevantSnapshots.length} snapshot liên quan (bắt đầu từ chỉ mục ${startIndex}).`);
      const flagLog = {};
      for (const snapshot of relevantSnapshots) {
        const stat = snapshot.statWithoutMeta;
        const cache = stat.cache;
        if (!stat?.chars || !cache?.time.clockAck) {
          character_log_processor_processor_logger.debug(funcName, `Snapshot (mk: ${snapshot.mk}) thiếu stat.chars hoặc cache.time.clockAck, bỏ qua.`);
          continue;
        }
        for (const charName in stat.chars) {
          if (Object.prototype.hasOwnProperty.call(stat.chars, charName)) {
            const charData = stat.chars[charName];
            const location = charData["Khu Vực Hiện Tại"];
            const target = charData["Mục Tiêu"];
            const clockAck = cache.time.clockAck;
            if (location &amp;&amp; target) {
              if (!flagLog[charName]) {
                flagLog[charName] = [];
                character_log_processor_processor_logger.debug(funcName, `Khởi tạo mảng nhật ký cho nhân vật "${charName}".`);
              }
              const newEntry = {
                location,
                target,
                clockAck
              };
              flagLog[charName].push(newEntry);
              character_log_processor_processor_logger.debug(funcName, `Thêm mục nhật ký mới cho nhân vật "${charName}".`, {
                entry: newEntry,
                snapshotMk: snapshot.mk
              });
            }
          }
        }
      }
      newCharacterLog[flag] = flagLog;
      character_log_processor_processor_logger.debug(funcName, `Xử lý nhật ký của flag "${flag}" hoàn tất.`, {
        flagLog: (0, external_namespaceObject.cloneDeep)(flagLog)
      });
    }
  }
  runtime.characterLog = newCharacterLog;
  character_log_processor_processor_logger.debug(funcName, "Xử lý nhật ký nhân vật toàn bộ hoàn tất, cập nhật runtime.", {
    newCharacterLog: (0, external_namespaceObject.cloneDeep)(newCharacterLog)
  });
  return runtime;
}

const character_log_processor_logger = new Logger("GSKO-BASE/core/character-log-processor");

function processCharacterLog(runtime) {
  character_log_processor_logger.debug("processCharacterLog", "Bắt đầu xử lý nhật ký nhân vật...");
  return processCharacterLogs(runtime);
}

const CharacterCacheSchema = external_z_namespaceObject.z.object({
  visit: external_z_namespaceObject.z.object({
    cooling: external_z_namespaceObject.z.boolean().optional()
  }).optional()
});

const IncidentCacheSchema = external_z_namespaceObject.z.object({
  incidentCooldownAnchor: external_z_namespaceObject.z.number().nullable().optional()
});

const CacheSchema = external_z_namespaceObject.z.object({
  time: external_z_namespaceObject.z.object({
    clockAck: ClockAckSchema.optional()
  }).optional().default({}),
  incident: IncidentCacheSchema.optional().default({}),
  character: external_z_namespaceObject.z.record(external_z_namespaceObject.z.string(), CharacterCacheSchema).optional().default({}),
  timeChatMkSync: TimeChatMkSyncCacheSchema.optional().default({})
});

function getCache(stat) {
  const cache = CacheSchema.parse(stat.cache ?? {});
  stat.cache = cache;
  return cache;
}

function applyCacheToStat(stat, cache) {
  stat.cache = cache;
}

function accessors_getChars(stat) {
  return stat.chars;
}

function getChar(stat, charId) {
  return stat.chars[charId];
}

function getGlobalAffectionStages(stat) {
  return stat.config?.affection?.affectionStages ?? [];
}

function getCharAffectionStages(runtime, charId) {
  return runtime.characterSettings?.[charId]?.affectionStages;
}

function accessors_getUserLocation(stat) {
  return stat.user?.[USER_FIELDS.currentLocation] ?? "";
}

function accessors_getCharLocation(stat, charId) {
  return getChar(stat, charId)?.[CHARACTER_FIELDS.currentLocation] ?? "";
}

function getCharLocationPath(charId) {
  return `chars.${charId}.${CHARACTER_FIELDS.currentLocation}`;
}

function getCharGoal(stat, charId) {
  return getChar(stat, charId)?.["Mục Tiêu"] ?? "";
}

function getCharGoalPath(charId) {
  return `chars.${charId}.Mục Tiêu`;
}

function getCharName(stat, charId) {
  return stat.chars[charId]?.name ?? charId;
}

function setCharLocationInStat(stat, charId, location) {
  stat.chars[charId][CHARACTER_FIELDS.currentLocation] = location;
}

function setCharGoalInStat(stat, charId, goal) {
  stat.chars[charId]["Mục Tiêu"] = goal;
}

function ensureCharacterRuntime(runtime, charId) {
  if (!runtime.character) {
    runtime.character = {
      chars: {},
      partitions: {
        coLocated: [],
        remote: []
      }
    };
  }
  if (!runtime.character.chars[charId]) {
    runtime.character.chars[charId] = external_z_namespaceObject.z.object({}).passthrough().parse({});
  }
}

function getCharacterRuntime(runtime, charId) {
  return runtime.character?.chars[charId];
}

function getAffectionStageFromRuntime(runtime, charId) {
  return getCharacterRuntime(runtime, charId)?.affectionStage;
}

function setAffectionStageInRuntime(runtime, charId, stage) {
  ensureCharacterRuntime(runtime, charId);
  runtime.character.chars[charId].affectionStage = stage;
}

function setNameInRuntime(runtime, charId, name) {
  ensureCharacterRuntime(runtime, charId);
  runtime.character.chars[charId].name = name;
}

function getDecisionFromRuntime(runtime, charId) {
  return getCharacterRuntime(runtime, charId)?.decision;
}

function setDecisionInRuntime(runtime, charId, decision) {
  ensureCharacterRuntime(runtime, charId);
  runtime.character.chars[charId].decision = decision;
}

function getCompanionDecisionFromRuntime(runtime, charId) {
  return getCharacterRuntime(runtime, charId)?.companionDecision;
}

function setCompanionDecisionInRuntime(runtime, charId, decision) {
  ensureCharacterRuntime(runtime, charId);
  runtime.character.chars[charId].companionDecision = decision;
}

function getCoLocatedPartition(runtime) {
  return runtime.character?.partitions.coLocated ?? [];
}

function setPartitions(runtime, partitions) {
  if (!runtime.character) {
    runtime.character = {
      chars: {},
      partitions: {
        coLocated: [],
        remote: []
      }
    };
  }
  runtime.character.partitions = partitions;
}

function ensureCharacterCache(cache, charId) {
  if (!cache.character) {
    cache.character = {};
  }
  if (!cache.character[charId]) {
    cache.character[charId] = external_z_namespaceObject.z.object({}).passthrough().parse({});
  }
}

function getCharacterCache(cache, charId) {
  return cache.character?.[charId];
}

function isVisitCooling(cache, charId) {
  return getCharacterCache(cache, charId)?.visit?.cooling === true;
}

function setVisitCooling(cache, charId, cooling) {
  ensureCharacterCache(cache, charId);
  const charCache = cache.character[charId];
  if (!charCache.visit) {
    charCache.visit = {};
  }
  charCache.visit.cooling = cooling;
}

const CHAR_RUNTIME_PATH = charId =&gt; `character.chars.${charId}`;

const AFFECTION_STAGE_IN_RUNTIME_PATH = charId =&gt; `${CHAR_RUNTIME_PATH(charId)}.affectionStage`;

const DECISION_IN_RUNTIME_PATH = charId =&gt; `${CHAR_RUNTIME_PATH(charId)}.decision`;

const COMPANION_DECISION_IN_RUNTIME_PATH = charId =&gt; `${CHAR_RUNTIME_PATH(charId)}.companionDecision`;

const CHAR_PARTITIONS_IN_RUNTIME_PATH = "character.partitions";

const CO_LOCATED_CHARS_IN_RUNTIME_PATH = null &amp;&amp; `${CHAR_PARTITIONS_IN_RUNTIME_PATH}.coLocated`;

const REMOTE_CHARS_IN_RUNTIME_PATH = null &amp;&amp; `${CHAR_PARTITIONS_IN_RUNTIME_PATH}.remote`;

const MODULE_CACHE_ROOT = "character-processor";

const VISIT_COOLING_PATH = charId =&gt; `${charId}.visit.cooling`;

const PREDEFINED_ACTIONS = {
  VISIT_HERO: {
    to: "HERO",
    do: "Bái phỏng nhân vật chính",
    source: "visit"
  },
  STAY_WITH_HERO: {
    to: "HERO",
    do: "Đồng hành cùng nhân vật chính",
    source: "companion"
  }
};

const ENTRY_KEYS = {
  PRIORITY: "priority",
  ACTION: "action",
  WHEN: "when"
};

const DEFAULT_VALUES = {
  UNKNOWN_LOCATION: "UNKNOWN",
  IDLE_ACTION_SOURCE: "idle",
  IDLE_ACTION_DO: "Chờ"
};

const aggregator_logger = new Logger("GSKO-BASE/core/character-processor/aggregator");

function getCharHomeOrFallback(stat, charId) {
  const char = getChar(stat, charId);
  const homeLocation = char?.[CHARACTER_FIELDS.home];
  if (typeof homeLocation === "string" &amp;&amp; homeLocation.trim() !== "") {
    return homeLocation;
  }
  return accessors_getUserLocation(stat);
}

function resolveTargetLocation(charId, to, stat, runtime) {
  if (to === "RANDOM") {
    const legalLocations = runtime.area?.legal_locations;
    if (legalLocations &amp;&amp; legalLocations.length &gt; 0) {
      const sampled = external_default().sample(legalLocations);
      if (sampled &amp;&amp; typeof sampled.name === "string") {
        return sampled.name;
      }
    }
    return getCharHomeOrFallback(stat, charId);
  }
  if (to === "$HOME") {
    return getCharHomeOrFallback(stat, charId);
  }
  if (!to) {
    return getCharHomeOrFallback(stat, charId);
  }
  if (to === "HERO") {
    return accessors_getUserLocation(stat);
  }
  return to;
}

function applyNonCompanionDecisions({stat, runtime, cache, nonCompanionDecisions}) {
  const funcName = "applyNonCompanionDecisions";
  const changes = [];
  const moduleName = "character-processor";
  external_default().forEach(nonCompanionDecisions, (decision, charId) =&gt; {
    aggregator_logger.debug(funcName, `Bắt đầu áp dụng quyết định của nhân vật ${charId}: [${decision.do}]`);
    const oldLocation = accessors_getCharLocation(stat, charId);
    const newLocation = resolveTargetLocation(charId, decision.to, stat, runtime);
    if (oldLocation !== newLocation) {
      setCharLocationInStat(stat, charId, newLocation);
      changes.push({
        module: moduleName,
        path: getCharLocationPath(charId),
        oldValue: oldLocation,
        newValue: newLocation,
        reason: `Nhân vật ${charId} di chuyển vị trí dựa trên quyết định "${decision.do}".`
      });
      aggregator_logger.debug(funcName, `[STAT] Nhân vật ${charId}: Vị trí -&gt; [${newLocation}]`);
    }
    const oldGoal = getCharGoal(stat, charId);
    const newGoal = decision.do;
    if (oldGoal !== newGoal) {
      setCharGoalInStat(stat, charId, newGoal);
      changes.push({
        module: moduleName,
        path: getCharGoalPath(charId),
        oldValue: oldGoal,
        newValue: newGoal,
        reason: `Nhân vật ${charId} cập nhật mục tiêu dựa trên quyết định.`
      });
      aggregator_logger.debug(funcName, `[STAT] Nhân vật ${charId}: Mục Tiêu -&gt; [${newGoal}]`);
    }
    setDecisionInRuntime(runtime, charId, decision);
    aggregator_logger.debug(funcName, `[RUNTIME] Nhân vật ${charId}: Đã ghi lại quyết định.`);
    if (decision.source === PREDEFINED_ACTIONS.VISIT_HERO.source) {
      setVisitCooling(cache, charId, true);
      aggregator_logger.debug(funcName, `[CACHE] Nhân vật ${charId}: Đã thiết lập thời gian hồi bái phỏng.`);
    }
  });
  return changes;
}

function applyCompanionDecisions({runtime, companionDecisions}) {
  const funcName = "applyCompanionDecisions";
  external_default().forEach(companionDecisions, (decision, charId) =&gt; {
    aggregator_logger.debug(funcName, `Bắt đầu áp dụng quyết định đồng hành của nhân vật ${charId}: [${decision.do}]`);
    setCompanionDecisionInRuntime(runtime, charId, decision);
    aggregator_logger.debug(funcName, `[RUNTIME] Nhân vật ${charId}: Đã ghi lại quyết định đồng hành.`);
  });
}

function aggregateResults({stat, runtime, cache, companionDecisions, nonCompanionDecisions, partitions}) {
  const funcName = "aggregateResults";
  aggregator_logger.debug(funcName, "Bắt đầu tổng hợp kết quả quyết định nhân vật...");
  const newStat = external_default().cloneDeep(stat);
  const newRuntime = external_default().cloneDeep(runtime);
  const newCache = external_default().cloneDeep(cache);
  const changes = [];
  try {
    setPartitions(newRuntime, partitions);
    applyCompanionDecisions({
      runtime: newRuntime,
      companionDecisions
    });
    const nonCompanionChanges = applyNonCompanionDecisions({
      stat: newStat,
      runtime: newRuntime,
      cache: newCache,
      nonCompanionDecisions
    });
    changes.push(...nonCompanionChanges);
    aggregator_logger.debug(funcName, "Tổng hợp kết quả hoàn tất.");
    return {
      stat: newStat,
      runtime: newRuntime,
      cache: newCache,
      changes
    };
  } catch (e) {
    aggregator_logger.error(funcName, "Xảy ra lỗi khi thực hiện tổng hợp kết quả:", e);
    return {
      stat,
      runtime,
      cache,
      changes: []
    };
  }
}

const action_processor_logger = new Logger("GSKO-BASE/core/character-processor/decision-makers/action-processor");

function areConditionsMet(entry, {runtime}) {
  const {when} = entry;
  if (!when) return {
    met: true,
    reason: "Không có điều kiện `when`."
  };
  const clock = runtime.clock;
  if (!clock) return {
    met: false,
    reason: "`runtime.clock` không tồn tại."
  };
  const reasons = [];
  if (when.byFlag) {
    const metFlags = when.byFlag.filter(flagPath =&gt; external_default().get(clock.flags, flagPath) === true);
    if (metFlags.length &gt; 0) {
      reasons.push(`Thỏa mãn Flag: [${metFlags.join(", ")}]`);
    } else {
      return {
        met: false,
        reason: `Không thỏa mãn bất kỳ Flag nào: [${when.byFlag.join(", ")}]`
      };
    }
  }
  if (when.byNow) {
    if (external_default().isMatch(clock.now, when.byNow)) {
      reasons.push(`Thỏa mãn điều kiện thời gian: ${JSON.stringify(when.byNow)}`);
    } else {
      return {
        met: false,
        reason: `Thời gian hiện tại ${JSON.stringify(clock.now)} không khớp với byNow ${JSON.stringify(when.byNow)}.`
      };
    }
  }
  if (when.byMonthDay) {
    const {month, day} = clock.now;
    if (month === when.byMonthDay.month &amp;&amp; day === when.byMonthDay.day) {
      reasons.push(`Thỏa mãn ngày: Ngày ${day} tháng ${month}`);
    } else {
      return {
        met: false,
        reason: `Ngày hiện tại Ngày ${day} tháng ${month} không khớp với byMonthDay.`
      };
    }
  }
  if (when.byFestival) {
    const currentFestival = runtime.festival?.current?.name;
    if (when.byFestival === "ANY") {
      if (currentFestival) {
        reasons.push(`Thỏa mãn điều kiện lễ hội: Hiện tại là lễ hội [${currentFestival}]`);
      } else {
        return {
          met: false,
          reason: "Yêu cầu lễ hội bất kỳ, nhưng hiện tại không có lễ hội."
        };
      }
    } else if (external_default().isString(when.byFestival)) {
      if (currentFestival === when.byFestival) {
        reasons.push(`Thỏa mãn điều kiện lễ hội: Hiện tại là [${currentFestival}]`);
      } else {
        return {
          met: false,
          reason: `Yêu cầu lễ hội [${when.byFestival}], nhưng hiện tại là [${currentFestival || "Không"}].`
        };
      }
    } else if (external_default().isArray(when.byFestival)) {
      if (currentFestival &amp;&amp; when.byFestival.includes(currentFestival)) {
        reasons.push(`Thỏa mãn điều kiện lễ hội: Lễ hội hiện tại [${currentFestival}] nằm trong danh sách chỉ định.`);
      } else {
        return {
          met: false,
          reason: `Lễ hội hiện tại [${currentFestival || "Không"}] không nằm trong danh sách lễ hội chỉ định [${when.byFestival.join(", ")}].`
        };
      }
    }
  }
  if (reasons.length === 0) {
    return {
      met: true,
      reason: "Điều kiện `when` trống hoặc không chỉ định bất kỳ kiểm tra hợp lệ nào."
    };
  }
  return {
    met: true,
    reason: reasons.join("; ")
  };
}

function chooseAction(charId, char, {runtime, stat}) {
  const funcName = "chooseAction";
  const specials = char.specials || [];
  action_processor_logger.debug(funcName, `Nhân vật ${charId}: Bắt đầu kiểm tra ${specials.length} hành động đặc biệt...`);
  const metSpecials = specials.map((entry, index) =&gt; ({
    ...entry,
    originalIndex: index
  })).filter(entry =&gt; {
    const {met, reason} = areConditionsMet(entry, {
      runtime
    });
    if (met) {
      action_processor_logger.debug(funcName, `Nhân vật ${charId}: Hành động đặc biệt [${entry.action.do}] thỏa mãn điều kiện. Lý do: ${reason}`);
    }
    return met;
  });
  if (metSpecials.length &gt; 0) {
    const highestPrioritySpecial = external_default().maxBy(metSpecials, ENTRY_KEYS.PRIORITY);
    if (highestPrioritySpecial) {
      action_processor_logger.debug(funcName, `Nhân vật ${charId}: Đã chọn hành động đặc biệt có độ ưu tiên cao nhất [${highestPrioritySpecial.action.do}] (P=${highestPrioritySpecial.priority}).`);
      return highestPrioritySpecial.action;
    }
  }
  const routine = char.routine || [];
  action_processor_logger.debug(funcName, `Nhân vật ${charId}: Bắt đầu kiểm tra ${routine.length} hành động thường ngày...`);
  for (const entry of routine) {
    const {met, reason} = areConditionsMet(entry, {
      runtime
    });
    if (met) {
      action_processor_logger.debug(funcName, `Nhân vật ${charId}: Đã chọn hành động thường ngày đầu tiên thỏa mãn điều kiện [${entry.action.do}]. Lý do: ${reason}`);
      return entry.action;
    }
  }
  action_processor_logger.debug(funcName, `Nhân vật ${charId}: Không tìm thấy bất kỳ hành động nào thỏa mãn điều kiện.`);
  return null;
}

function makeActionDecisions({runtime, stat, remainingChars}) {
  const funcName = "makeActionDecisions";
  const decisions = {};
  for (const charId of remainingChars) {
    const char = getChar(stat, charId);
    if (!char) continue;
    action_processor_logger.debug(funcName, `Bắt đầu chọn hành động thông thường cho nhân vật ${charId}...`);
    const action = chooseAction(charId, char, {
      runtime,
      stat
    });
    if (action) {
      const finalAction = {
        ...action
      };
      const currentLocation = accessors_getCharLocation(stat, charId) || DEFAULT_VALUES.UNKNOWN_LOCATION;
      if (!finalAction.to) {
        finalAction.to = currentLocation;
      }
      finalAction.from = currentLocation;
      decisions[charId] = finalAction;
      action_processor_logger.debug(funcName, `Đã phân bổ hành động [${finalAction.do}] cho nhân vật ${charId}.`);
    } else {
      action_processor_logger.debug(funcName, `Nhân vật ${charId} không trúng bất kỳ hành động nào, lần này không đưa ra quyết định.`);
    }
  }
  return {
    decisions
  };
}

const companion_processor_logger = new Logger("GSKO-BASE/core/character-processor/decision-makers/companion-processor");

function isPatienceWindowHit(patienceUnit, flags) {
  switch (patienceUnit) {
   case "period":
    return flags.newPeriod === true || Object.values(flags.byPeriod).some(v =&gt; v === true);

   case "day":
    return flags.newDay === true;

   case "week":
    return flags.newWeek === true;

   case "month":
    return flags.newMonth === true;

   case "season":
    return flags.newSeason === true;

   case "year":
    return flags.newYear === true;

   default:
    return false;
  }
}

function makeCompanionDecisions({runtime, coLocatedChars}) {
  const funcName = "makeCompanionDecisions";
  const companionChars = [];
  const clockFlags = runtime.clock?.flags;
  if (!clockFlags) {
    companion_processor_logger.warn(funcName, "Không thể lấy clock flags, tất cả nhân vật cùng khu vực sẽ được xem là \"đồng hành\".");
    return {
      companionChars: coLocatedChars
    };
  }
  for (const charId of coLocatedChars) {
    const affectionStage = getAffectionStageFromRuntime(runtime, charId);
    const patienceUnit = affectionStage?.patienceUnit;
    if (!patienceUnit || !isPatienceWindowHit(patienceUnit, clockFlags)) {
      companionChars.push(charId);
      companion_processor_logger.debug(funcName, `Kiên nhẫn của nhân vật ${charId} chưa cạn (patienceUnit: ${patienceUnit || "Không"}), đánh dấu là "đồng hành".`);
    } else {
      companion_processor_logger.debug(funcName, `Kiên nhẫn của nhân vật ${charId} đã cạn ở ${patienceUnit}, sẽ do module sau quyết định hành động mới.`);
    }
  }
  return {
    companionChars
  };
}

const visit_processor_logger = new Logger("GSKO-BASE/core/character-processor/decision-makers/visit-processor");

function checkProbability(probBase = 0, probK = 0, affection = 0) {
  const finalProb = external_default().clamp(probBase + probK * affection, 0, 1);
  const passed = Math.random() < finalProb;
  return {
    passed,
    finalProb
  };
}

function makeVisitDecisions({runtime, stat, cache, remoteChars}) {
  const funcName = "makeVisitDecisions";
  const decisions = {};
  const decidedChars = [];
  const newCache = external_default().cloneDeep(cache);
  const changeLog = [];
  const potentialVisitors = [];
  for (const charId of remoteChars) {
    const affectionStage = getAffectionStageFromRuntime(runtime, charId);
    if (!affectionStage?.visit?.enabled) continue;
    const char = getChar(stat, charId);
    if (!char) continue;
    const isCooling = isVisitCooling(newCache, charId);
    if (isCooling) {
      visit_processor_logger.debug(funcName, `Nhân vật ${charId} đang trong thời gian hồi bái phỏng, bỏ qua quyết định.`);
      continue;
    }
    const {probBase = 0, probK = 0} = affectionStage.visit;
    const {passed, finalProb} = checkProbability(probBase, probK, char["Độ Hảo Cảm"]);
    if (passed) {
      potentialVisitors.push(charId);
      visit_processor_logger.debug(funcName, `Nhân vật ${charId} vượt qua kiểm tra xác suất (P=${finalProb.toFixed(2)}), trở thành người bái phỏng tiềm năng.`);
    } else {
      visit_processor_logger.debug(funcName, `Nhân vật ${charId} không vượt qua kiểm tra xác suất (P=${finalProb.toFixed(2)}), không tiến hành bái phỏng.`);
    }
  }
  const visitors = potentialVisitors.length &gt; 2 ? external_default().sampleSize(potentialVisitors, 2) : potentialVisitors;
  if (potentialVisitors.length &gt; 2) {
    visit_processor_logger.debug(funcName, `Có ${potentialVisitors.length} người muốn bái phỏng, chọn ngẫu nhiên 2 người: ${visitors.join(", ")}`);
  }
  for (const charId of visitors) {
    decisions[charId] = PREDEFINED_ACTIONS.VISIT_HERO;
    decidedChars.push(charId);
    const oldValue = external_default().get(newCache, `character.${charId}.visit.cooling`);
    setVisitCooling(newCache, charId, true);
    changeLog.push({
      module: funcName,
      path: `cache.character.${charId}.visit.cooling`,
      oldValue,
      newValue: true,
      reason: `Nhân vật ${charId} quyết định đến bái phỏng, vào thời gian hồi.`
    });
    visit_processor_logger.debug(funcName, `Nhân vật ${charId} cuối cùng quyết định đến bái phỏng nhân vật chính.`);
  }
  return {
    decisions,
    decidedChars,
    newCache,
    changeLog
  };
}

const decision_makers_logger = new Logger("GSKO-BASE/core/character-processor/decision-makers");

function makeDecisions({runtime, stat, cache, coLocatedChars, remoteChars}) {
  const funcName = "makeDecisions";
  decision_makers_logger.debug(funcName, "Bắt đầu đưa ra quyết định cho tất cả nhân vật...");
  try {
    decision_makers_logger.debug(funcName, `Bắt đầu đưa ra quyết định "bái phỏng" cho ${remoteChars.length} nhân vật khác khu vực...`);
    const {decisions: visitDecisions, decidedChars: visitingChars, newCache, changeLog: visitChangeLog} = makeVisitDecisions({
      runtime,
      stat,
      cache,
      remoteChars
    });
    decision_makers_logger.debug(funcName, `Quyết định "bái phỏng" hoàn tất, ${visitingChars.length} người quyết định bái phỏng: [${visitingChars.join(", ")}]`);
    decision_makers_logger.debug(funcName, `Bắt đầu kiểm tra "đồng hành" cho ${coLocatedChars.length} nhân vật cùng khu vực...`);
    const {companionChars} = makeCompanionDecisions({
      runtime,
      coLocatedChars
    });
    decision_makers_logger.debug(funcName, `Kiểm tra "đồng hành" hoàn tất, ${companionChars.length} người được đánh dấu là "đồng hành": [${companionChars.join(", ")}]`);
    const allCharIds = external_default().union(coLocatedChars, remoteChars);
    const remainingChars = external_default().difference(allCharIds, visitingChars, companionChars);
    decision_makers_logger.debug(funcName, `Bắt đầu đưa ra quyết định hành động cho ${remainingChars.length} nhân vật "thông thường": [${remainingChars.join(", ")}]`);
    const {decisions: normalActionDecisions} = makeActionDecisions({
      runtime,
      stat,
      remainingChars
    });
    decision_makers_logger.debug(funcName, "Quyết định hành động nhân vật \"thông thường\" hoàn tất.");
    decision_makers_logger.debug(funcName, `Bắt đầu đưa ra quyết định hành động thông thường cho ${companionChars.length} nhân vật "đồng hành": [${companionChars.join(", ")}]`);
    const {decisions: companionActionDecisions} = makeActionDecisions({
      runtime,
      stat,
      remainingChars: companionChars
    });
    decision_makers_logger.debug(funcName, "Quyết định hành động thông thường nhân vật \"đồng hành\" hoàn tất.");
    const nonCompanionDecisions = external_default().merge({}, normalActionDecisions, visitDecisions);
    decision_makers_logger.debug(funcName, `Đưa ra quyết định hoàn tất. Quyết định của ${external_default().size(nonCompanionDecisions)} "nhân vật khác" sẽ được aggregator cập nhật vào stat, quyết định của ${external_default().size(companionActionDecisions)} "nhân vật đồng hành" sẽ được aggregator cập nhật vào runtime.`);
    return {
      companionDecisions: companionActionDecisions,
      nonCompanionDecisions,
      newCache,
      changeLog: visitChangeLog
    };
  } catch (e) {
    decision_makers_logger.error(funcName, "Xảy ra lỗi khi thực hiện đưa ra quyết định:", e);
    return {
      companionDecisions: {},
      nonCompanionDecisions: {},
      newCache: cache,
      changeLog: []
    };
  }
}

function getAffectionStage(char, affectionStages) {
  if (!affectionStages || !Array.isArray(affectionStages)) {
    return null;
  }
  const parsedStages = affectionStages.map(stage =&gt; typeof stage === "string" ? JSON.parse(stage) : stage);
  const applicableStages = parsedStages.filter(stage =&gt; char["Độ Hảo Cảm"] &gt;= stage.threshold);
  if (applicableStages.length === 0) {
    return null;
  }
  return external_default().maxBy(applicableStages, "threshold") || null;
}

const preprocessor_logger = new Logger("GSKO-BASE/core/character-processor/preprocessor");

function isCooldownResetTriggered(coolUnit, flags) {
  if (!coolUnit || !flags) return false;
  switch (coolUnit) {
   case "period":
    return flags.newPeriod === true || Object.values(flags.byPeriod || {}).some(v =&gt; v === true);

   case "day":
    return flags.newDay === true;

   case "week":
    return flags.newWeek === true;

   case "month":
    return flags.newMonth === true;

   case "season":
    return flags.newSeason === true;

   case "year":
    return flags.newYear === true;

   default:
    return false;
  }
}

function preprocess({runtime, stat, cache}) {
  const funcName = "preprocess";
  preprocessor_logger.debug(funcName, "Bắt đầu thực hiện tiền xử lý...");
  try {
    const newRuntime = external_default().cloneDeep(runtime);
    const newCache = external_default().cloneDeep(cache);
    const changes = [];
    const charIds = Object.keys(accessors_getChars(stat));
    for (const charId of charIds) {
      const char = getChar(stat, charId);
      if (!char) continue;
      setNameInRuntime(newRuntime, charId, char.name);
      const charAffectionStages = getCharAffectionStages(newRuntime, charId);
      if (!charAffectionStages || charAffectionStages.length === 0) {
        preprocessor_logger.debug(funcName, `Không tìm thấy bảng cấp độ hảo cảm của nhân vật ${charId} trong runtime.characterSettings, bỏ qua xử lý.`);
        continue;
      }
      const affectionStage = getAffectionStage(char, charAffectionStages);
      if (affectionStage) {
        setAffectionStageInRuntime(newRuntime, charId, affectionStage);
        preprocessor_logger.debug(funcName, `Nhân vật ${charId} (Độ Hảo Cảm: ${char["Độ Hảo Cảm"]}) phân tích được cấp độ hảo cảm: [${affectionStage.name}]`);
      } else {
        preprocessor_logger.debug(funcName, `Nhân vật ${charId} (Độ Hảo Cảm: ${char["Độ Hảo Cảm"]}) không phân tích được bất kỳ cấp độ hảo cảm nào.`);
        continue;
      }
      const coolUnit = affectionStage.visit?.coolUnit;
      const cooling = isVisitCooling(newCache, charId);
      const triggered = isCooldownResetTriggered(coolUnit, newRuntime.clock?.flags);
      if (cooling &amp;&amp; triggered) {
        setVisitCooling(newCache, charId, false);
        preprocessor_logger.debug(funcName, `Thời gian hồi bái phỏng của nhân vật ${charId} đã được đặt lại tại nhịp ${coolUnit}.`);
      } else if (cooling) {
        preprocessor_logger.debug(funcName, `Nhân vật ${charId} đang trong thời gian hồi bái phỏng, nhưng không trúng nhịp đặt lại (coolUnit: ${coolUnit || "Không"}).`);
      }
    }
    preprocessor_logger.debug(funcName, "Thực hiện tiền xử lý hoàn tất.");
    return {
      runtime: newRuntime,
      cache: newCache,
      changes
    };
  } catch (e) {
    preprocessor_logger.error(funcName, "Xảy ra lỗi khi thực hiện tiền xử lý:", e);
    return {
      runtime,
      cache,
      changes: []
    };
  }
}

const character_processor_logger = new Logger("GSKO-BASE/core/character-processor");

async function processCharacterDecisions({stat, runtime}) {
  const funcName = "processCharacterDecisions";
  character_processor_logger.debug(funcName, "Bắt đầu xử lý quyết định nhân vật...");
  try {
    const initialCache = getCache(stat);
    const {runtime: processedRuntime, cache: processedCache, changes: preprocessChanges} = preprocess({
      runtime,
      stat,
      cache: initialCache
    });
    const playerLocation = processedRuntime.characterDistribution?.playerLocation;
    const coLocatedChars = playerLocation ? processedRuntime.characterDistribution?.npcByLocation[playerLocation] ?? [] : [];
    const allNpcIds = external_default().keys(stat.chars);
    const remoteChars = external_default().difference(allNpcIds, coLocatedChars);
    const partitions = {
      coLocated: coLocatedChars,
      remote: remoteChars
    };
    if (runtime.incident?.isIncidentActive) {
      character_processor_logger.debug(funcName, "Phát hiện dị biến đang xảy ra, bỏ qua tất cả quyết định của nhân vật.");
      const {stat: finalStat, runtime: finalRuntime, cache: finalCache, changes: aggregateChanges} = aggregateResults({
        stat,
        runtime: processedRuntime,
        cache: processedCache,
        companionDecisions: {},
        nonCompanionDecisions: {},
        partitions
      });
      applyCacheToStat(finalStat, finalCache);
      return {
        stat: finalStat,
        runtime: finalRuntime,
        changes: [ ...preprocessChanges, ...aggregateChanges ]
      };
    }
    const {companionDecisions, nonCompanionDecisions, newCache: decidedCache, changeLog: decisionChangeLog} = makeDecisions({
      runtime: processedRuntime,
      stat,
      cache: processedCache,
      coLocatedChars,
      remoteChars
    });
    const {stat: finalStat, runtime: finalRuntime, cache: finalCache, changes: aggregateChanges} = aggregateResults({
      stat,
      runtime: processedRuntime,
      cache: decidedCache,
      companionDecisions,
      nonCompanionDecisions,
      partitions
    });
    applyCacheToStat(finalStat, finalCache);
    character_processor_logger.debug(funcName, "Xử lý quyết định nhân vật hoàn tất.");
    const allChanges = [ ...preprocessChanges, ...decisionChangeLog, ...aggregateChanges ];
    return {
      stat: finalStat,
      runtime: finalRuntime,
      changes: allChanges
    };
  } catch (e) {
    character_processor_logger.error(funcName, "Xảy ra lỗi ngoài ý muốn khi xử lý quyết định nhân vật:", e);
    return {
      stat,
      runtime,
      changes: []
    };
  }
}

function accessors_getGlobalAffectionStages(stat) {
  return stat.config?.affection?.affectionStages ?? [];
}

function getGlobalSpecials(stat) {
  return stat.config?.specials ?? [];
}

function getGlobalRoutine(stat) {
  return stat.config?.routine ?? [];
}

function accessors_getCharAffectionStages(stat, charId) {
  const charStages = stat.chars?.[charId]?.affectionStages;
  if (charStages &amp;&amp; charStages.length &gt; 0) {
    return charStages;
  }
  return accessors_getGlobalAffectionStages(stat);
}

function getCharSpecials(stat, charId) {
  const charSpecials = stat.chars?.[charId]?.specials;
  if (charSpecials &amp;&amp; charSpecials.length &gt; 0) {
    return charSpecials;
  }
  return getGlobalSpecials(stat);
}

function getCharRoutine(stat, charId) {
  const charRoutine = stat.chars?.[charId]?.routine;
  if (charRoutine &amp;&amp; charRoutine.length &gt; 0) {
    return charRoutine;
  }
  return getGlobalRoutine(stat);
}

function processCharacterSettings({stat}) {
  const settingsMap = {};
  if (!stat.chars) {
    return settingsMap;
  }
  for (const charId in stat.chars) {
    const character = stat.chars[charId];
    if (!character) continue;
    const affectionStages = accessors_getCharAffectionStages(stat, charId);
    const specials = getCharSpecials(stat, charId);
    const routine = getCharRoutine(stat, charId);
    const settings = {
      id: charId,
      name: character.name,
      affectionStages,
      specials,
      routine
    };
    settingsMap[charId] = settings;
  }
  return settingsMap;
}

function process({runtime, stat}) {
  const characterSettings = processCharacterSettings({
    stat
  });
  const newRuntime = Object.assign({}, runtime, {
    characterSettings
  });
  return newRuntime;
}

const constants_ERA_EVENT_NAMES = {
  INSERT_BY_OBJECT: "era:insertByObject",
  UPDATE_BY_OBJECT: "era:updateByObject",
  INSERT_BY_PATH: "era:insertByPath",
  UPDATE_BY_PATH: "era:updateByPath",
  DELETE_BY_OBJECT: "era:deleteByObject",
  DELETE_BY_PATH: "era:deleteByPath",
  GET_CURRENT_VARS: "era:getCurrentVars",
  GET_SNAPSHOT_AT_MK: "era:getSnapshotAtMk",
  GET_SNAPSHOTS_BETWEEN_MKS: "era:getSnapshotsBetweenMks",
  GET_SNAPSHOT_AT_MID: "era:getSnapshotAtMId",
  GET_SNAPSHOTS_BETWEEN_MIDS: "era:getSnapshotsBetweenMIds",
  REQUEST_WRITE_DONE: "era:requestWriteDone"
};

const constants_ERA_BROADCAST_EVENT_NAMES = {
  WRITE_DONE: "era:writeDone",
  QUERY_RESULT: "era:queryResult"
};

const QueryResultItemSchema = external_z_namespaceObject.z.object({
  node: external_z_namespaceObject.z.string(),
  message_id: external_z_namespaceObject.z.number(),
  is_user: external_z_namespaceObject.z.boolean(),
  stat: external_z_namespaceObject.z.any(),
  statWithoutMeta: external_z_namespaceObject.z.any()
});

const OtherCharacterInfoSchema = external_z_namespaceObject.z.object({
  name: external_z_namespaceObject.z.string(),
  target: external_z_namespaceObject.z.string()
});

const AyaNewsEntrySchema = external_z_namespaceObject.z.object({
  location: external_z_namespaceObject.z.string(),
  otherCharacters: external_z_namespaceObject.z.array(OtherCharacterInfoSchema),
  target: external_z_namespaceObject.z.string(),
  clockAck: ClockAckSchema
});

const AyaNewsSchema = external_z_namespaceObject.z.object({
  entries: external_z_namespaceObject.z.array(AyaNewsEntrySchema)
});

const IncidentDetailSchema = external_z_namespaceObject.z.object({
  "Chi Tiết Dị Biến": external_z_namespaceObject.z.string(),
  "Khu Vực Chính": external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()),
  "Người Giải Quyết Dị Biến": external_z_namespaceObject.z.union([ external_z_namespaceObject.z.string(), external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()) ]).optional(),
  "Dị Biến Kết Thúc": external_z_namespaceObject.z.boolean()
});

const IncidentsSchema = external_z_namespaceObject.z.record(external_z_namespaceObject.z.string(), IncidentDetailSchema);

const WEATHER_CONDITION_TYPES = [ "clear", "partly_cloudy", "overcast", "light_rain", "heavy_rain", "storm", "snow", "fog" ];

const WeatherConditionTypeEnum = external_z_namespaceObject.z.enum(WEATHER_CONDITION_TYPES);

const WeatherConditionSchema = external_z_namespaceObject.z.object({
  type: WeatherConditionTypeEnum,
  label: external_z_namespaceObject.z.string(),
  description: external_z_namespaceObject.z.string()
});

const WeatherTemperatureSchema = external_z_namespaceObject.z.object({
  minC: external_z_namespaceObject.z.number(),
  maxC: external_z_namespaceObject.z.number()
});

const WeatherDaySchema = external_z_namespaceObject.z.object({
  condition: WeatherConditionSchema,
  temperature: WeatherTemperatureSchema,
  precipitationChance: external_z_namespaceObject.z.number().min(0).max(1),
  humidity: external_z_namespaceObject.z.number().min(0).max(1),
  windLevel: external_z_namespaceObject.z.number().min(0),
  narrative: external_z_namespaceObject.z.string()
});

const WeatherRuntimeSchema = external_z_namespaceObject.z.object({
  generatedAtISO: external_z_namespaceObject.z.string(),
  anchorDayISO: external_z_namespaceObject.z.string(),
  days: external_z_namespaceObject.z.array(WeatherDaySchema).min(1)
});

const IncidentRuntimeInfoSchema = external_z_namespaceObject.z.object({
  name: external_z_namespaceObject.z.string(),
  detail: external_z_namespaceObject.z.string(),
  solver: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()),
  mainLoc: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()),
  isFinished: external_z_namespaceObject.z.boolean(),
  raw: IncidentDetailSchema
});

const runtime_ActionSchema = external_z_namespaceObject.z.object({
  do: external_z_namespaceObject.z.string(),
  to: external_z_namespaceObject.z.string().optional(),
  from: external_z_namespaceObject.z.string().optional(),
  source: external_z_namespaceObject.z.string().optional()
});

const IncidentSchema = external_z_namespaceObject.z.object({
  decision: external_z_namespaceObject.z.enum([ "continue", "start_new", "daily" ]),
  current: IncidentRuntimeInfoSchema.optional(),
  spawn: IncidentRuntimeInfoSchema.optional(),
  remainingCooldown: external_z_namespaceObject.z.number().optional(),
  isIncidentActive: external_z_namespaceObject.z.boolean()
});

const CurrentFestivalInfoSchema = external_z_namespaceObject.z.object({
  name: external_z_namespaceObject.z.string(),
  host: external_z_namespaceObject.z.string(),
  customs: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()),
  month: external_z_namespaceObject.z.number(),
  start_day: external_z_namespaceObject.z.number(),
  end_day: external_z_namespaceObject.z.number()
});

const NextFestivalInfoSchema = CurrentFestivalInfoSchema.extend({
  days_until: external_z_namespaceObject.z.number()
});

const FestivalSchema = external_z_namespaceObject.z.object({
  ongoing: external_z_namespaceObject.z.boolean(),
  upcoming: external_z_namespaceObject.z.boolean(),
  current: CurrentFestivalInfoSchema.nullable(),
  next: NextFestivalInfoSchema.nullable()
});

const CharacterDistributionSchema = external_z_namespaceObject.z.object({
  playerLocation: external_z_namespaceObject.z.string().nullable(),
  npcByLocation: external_z_namespaceObject.z.record(external_z_namespaceObject.z.string(), external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()))
});

const CharacterRuntimeSchema = external_z_namespaceObject.z.object({
  name: external_z_namespaceObject.z.string().optional(),
  affectionStage: AffectionStageWithForgetSchema.optional(),
  decision: runtime_ActionSchema.optional(),
  companionDecision: runtime_ActionSchema.optional()
});

const BfsPathSchema = external_z_namespaceObject.z.object({
  hops: external_z_namespaceObject.z.number(),
  steps: external_z_namespaceObject.z.array(external_z_namespaceObject.z.object({
    from: external_z_namespaceObject.z.string(),
    to: external_z_namespaceObject.z.string()
  }))
});

const RouteSchema = external_z_namespaceObject.z.object({
  destination: external_z_namespaceObject.z.string(),
  path: BfsPathSchema
});

const RouteInfoSchema = external_z_namespaceObject.z.object({
  candidates: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()),
  routes: external_z_namespaceObject.z.array(RouteSchema)
});

const FullMapLeafSchema = MapLeafSchema.extend({
  name: external_z_namespaceObject.z.string()
});

const AreaRuntimeInfoSchema = external_z_namespaceObject.z.object({
  graph: external_z_namespaceObject.z.record(external_z_namespaceObject.z.string(), external_z_namespaceObject.z.record(external_z_namespaceObject.z.string(), external_z_namespaceObject.z.boolean())),
  legal_locations: external_z_namespaceObject.z.array(FullMapLeafSchema),
  neighbors: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()),
  loadArea: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()),
  route: RouteInfoSchema,
  mapSize: MapSizeSchema.optional()
});

const RuntimeSchema = external_z_namespaceObject.z.object({
  incident: IncidentSchema.optional(),
  clock: ClockSchema.optional(),
  weather: WeatherRuntimeSchema.optional(),
  area: AreaRuntimeInfoSchema.optional(),
  festival: FestivalSchema.optional(),
  characterDistribution: CharacterDistributionSchema.optional(),
  character: external_z_namespaceObject.z.object({
    chars: external_z_namespaceObject.z.record(external_z_namespaceObject.z.string(), CharacterRuntimeSchema),
    partitions: external_z_namespaceObject.z.object({
      coLocated: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()),
      remote: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string())
    }),
    mentionedCharIds: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()).optional()
  }).optional(),
  characterLog: external_z_namespaceObject.z.object({}).passthrough().optional(),
  characterSettings: CharacterSettingsMapSchema.optional(),
  snapshots: external_z_namespaceObject.z.array(QueryResultItemSchema).optional(),
  ayaNews: AyaNewsSchema.optional()
});

const runtime_logger = new Logger("GSKO-BASE/utils/runtime");

function getRuntimeObject() {
  return RuntimeSchema.parse({});
}

async function setRuntimeObject(runtimeObject, options) {
  const funcName = "setRuntimeObject";
  const {mode = "replace"} = options ?? {};
  try {
    if (typeof updateVariablesWith !== "function") {
      runtime_logger.error(funcName, "updateVariablesWith hiện không khả dụng.");
      return false;
    }
    runtime_logger.debug(funcName, `Đang ghi vào chat.runtime (chế độ: ${mode})`, {
      runtimeObject
    });
    await updateVariablesWith(vars =&gt; {
      const chatVars = vars || {};
      if (mode === "replace") {
        chatVars.runtime = runtimeObject;
      } else {
        const existingRuntime = chatVars.runtime ?? {};
        chatVars.runtime = external_default().merge({}, existingRuntime, runtimeObject);
      }
      return chatVars;
    }, {
      type: "chat"
    });
    runtime_logger.debug(funcName, "Đã ghi thành công vào chat.runtime");
    return true;
  } catch (error) {
    runtime_logger.error(funcName, "Ghi runtime thất bại", error);
    return false;
  }
}

const data_sender_logger = new Logger("GSKO-BASE/core/data-sender");

async function sendData({stat, runtime, eraPayload: originalPayload, changes}) {
  const funcName = "sendData";
  data_sender_logger.debug(funcName, "Bắt đầu gửi dữ liệu...");
  await setRuntimeObject(runtime, {
    mode: "replace"
  });
  if (typeof eventEmit === "function") {
    const uiPayload = {
      ...originalPayload,
      statWithoutMeta: stat,
      runtime,
      statChanges: changes
    };
    eventEmit("GSKO:showUI", uiPayload);
    data_sender_logger.debug(funcName, "Đã gửi sự kiện GSKO:showUI", uiPayload);
  } else {
    data_sender_logger.warn(funcName, "Hàm eventEmit không khả dụng, không thể gửi sự kiện cập nhật giao diện (UI).");
  }
  data_sender_logger.debug(funcName, "Gửi dữ liệu hoàn tất.");
}

const MONTH_DAYS = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

function dayOfYear(month, day) {
  let dayIndex = 0;
  for (let i = 0; i < month - 1; i++) {
    dayIndex += MONTH_DAYS[i];
  }
  return dayIndex + day;
}

function toNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

const festival_processor_processor_logger = new Logger("GSKO-BASE/core/festival-processor/processor");

function processFestival({runtime, stat}) {
  const funcName = "processFestival";
  const defaultFestivalInfo = {
    ongoing: false,
    upcoming: false,
    current: null,
    next: null
  };
  try {
    if (!runtime.clock) {
      festival_processor_processor_logger.warn(funcName, "runtime.clock chưa được định nghĩa, không thể xử lý thông tin lễ hội.");
      return {
        festival: defaultFestivalInfo
      };
    }
    const {month: currentMonth, day: currentDay} = runtime.clock.now;
    const {festivals_list: festivalList} = stat;
    if (Object.keys(festivalList).length === 0) {
      festival_processor_processor_logger.debug(funcName, "Danh sách lễ hội trống, tiến hành ghi thông tin lễ hội mặc định.");
      return {
        festival: defaultFestivalInfo
      };
    }
    festival_processor_processor_logger.debug(funcName, `Ngày: ${currentMonth}/${currentDay}，Số lượng mục trong danh sách lễ hội: ${Object.keys(festivalList).length}`);
    let todayFest = null;
    for (const festId in festivalList) {
      const fest = festivalList[festId];
      if (fest.month === currentMonth &amp;&amp; fest.start_day <= currentDay &amp;&amp; currentDay <= fest.end_day) {
        todayFest = fest;
        break;
      }
    }
    const todayDayOfYear = dayOfYear(currentMonth, currentDay);
    let nextFest = null;
    let minDayGap = Infinity;
    for (const festId in festivalList) {
      const fest = festivalList[festId];
      const startDayOfYear = dayOfYear(fest.month, fest.start_day);
      const rawGap = startDayOfYear - todayDayOfYear;
      const normalizedGap = (rawGap % 365 + 365) % 365;
      if (normalizedGap === 0) {
        continue;
      }
      if (normalizedGap &gt; 0 &amp;&amp; normalizedGap < minDayGap) {
        minDayGap = normalizedGap;
        nextFest = fest;
      }
    }
    const festivalInfo = {
      ongoing: !!todayFest,
      upcoming: !!(nextFest &amp;&amp; minDayGap <= 3),
      current: todayFest ? {
        name: todayFest.name,
        host: todayFest.host ?? "",
        customs: todayFest.customs?.slice(0, 6) ?? [],
        month: todayFest.month,
        start_day: todayFest.start_day,
        end_day: todayFest.end_day
      } : null,
      next: nextFest &amp;&amp; minDayGap <= 3 ? {
        name: nextFest.name,
        host: nextFest.host ?? "",
        customs: nextFest.customs?.slice(0, 6) ?? [],
        month: nextFest.month,
        start_day: nextFest.start_day,
        end_day: nextFest.end_day,
        days_until: minDayGap
      } : null
    };
    const result = {
      festival: festivalInfo
    };
    festival_processor_processor_logger.debug(funcName, "Đã hoàn thành xử lý dữ liệu lễ hội, trả về dữ liệu chuẩn bị ghi vào runtime：", result);
    return result;
  } catch (err) {
    festival_processor_processor_logger.error(funcName, "Chạy thất bại: " + (err?.message || String(err)), err);
    return {
      festival: defaultFestivalInfo
    };
  }
}

const festival_processor_logger = new Logger("GSKO-BASE/core/festival-processor");

async function festival_processor_processFestival({stat, runtime}) {
  const funcName = "processFestival";
  festival_processor_logger.debug(funcName, "Bắt đầu xử lý lễ hội...");
  try {
    const festivalResult = processFestival({
      stat,
      runtime
    });
    external_default().merge(runtime, festivalResult);
    festival_processor_logger.debug(funcName, "Xử lý lễ hội hoàn tất.");
    return {
      runtime
    };
  } catch (e) {
    festival_processor_logger.error(funcName, "Đã xảy ra lỗi ngoài ý muốn khi xử lý lễ hội:", e);
    return {
      runtime
    };
  }
}

const DEFAULT_INCIDENT_CONFIG = {
  cooldownMinutes: 10080,
  isRandomPool: true,
  forceTrigger: false,
  pool: [],
  randomCore: [ "Mùa", "Kết giới", "Yêu khí", "Mộng cảnh", "Cái bóng", "Tinh quang", "Thời gian", "Ngôn ngữ", "Tiếng nhạc", "Hương thơm" ],
  randomType: [ "Hỗn loạn", "Chảy ngược", "Tràn ra", "Đình trệ", "Lệch hướng", "Hồi âm", "Xâm nhiễm", "Cộng hưởng", "Đảo ngược", "Phản phệ" ]
};

const DEFAULT_RANDOM_CORE = DEFAULT_INCIDENT_CONFIG.randomCore;

const DEFAULT_RANDOM_TYPE = DEFAULT_INCIDENT_CONFIG.randomType;

function getIncidentConfig(stat) {
  const userConfig = stat.config?.incident ?? {};
  return {
    ...DEFAULT_INCIDENT_CONFIG,
    ...userConfig
  };
}

function getIncidents(stat) {
  return stat.incidents ?? {};
}

function setIncidents(stat, incidents) {
  stat.incidents = incidents;
}

function getTimeProgress(stat) {
  return stat.time?.timeProgress ?? 0;
}

function getLegalLocations(runtime) {
  return runtime.area?.legal_locations?.map(location =&gt; location.name) ?? [ "Đền Hakurei" ];
}

function getIncidentCache(cache) {
  return cache.incident ?? {
    incidentCooldownAnchor: null
  };
}

function setIncidentCache(cache, incidentCache) {
  cache.incident = incidentCache;
}

const strip = inputString =&gt; {
  try {
    const match = String(inputString || "").match(/^\s*```(?:json)?\s*([\s\S]*?)\s*```/i);
    return match ? match[1] : String(inputString || "");
  } catch (_) {
    return String(inputString || "");
  }
};

const asArray = value =&gt; Array.isArray(value) ? value.map(item =&gt; String(item)) : value == null || value === "" ? [] : [ String(value) ];

const pick = array =&gt; Array.isArray(array) &amp;&amp; array.length ? array[Math.floor(Math.random() * array.length)] : undefined;

const incident_processor_processor_logger = new Logger("GSKO-BASE/core/incident-processor/processor");

function getCurrentIncident(stat) {
  const allIncidents = getIncidents(stat);
  for (const name in allIncidents) {
    const incident = allIncidents[name];
    if (incident &amp;&amp; !incident["Dị Biến Kết Thúc"]) {
      return {
        name,
        detail: incident["Chi Tiết Dị Biến"],
        solver: asArray(incident["Người giải quyết dị biến"]),
        mainLoc: incident["Khu Vực Chính"],
        isFinished: false,
        raw: incident
      };
    }
  }
  return null;
}

function getAvailableIncidents(stat, config) {
  const {pool} = config;
  const allIncidents = getIncidents(stat);
  const existingNames = new Set(Object.keys(allIncidents));
  return (pool ?? []).map(item =&gt; {
    const detail = {
      "Chi Tiết Dị Biến": item.detail,
      "Khu Vực Chính": asArray(item.mainLoc),
      "Dị Biến Kết Thúc": false
    };
    return {
      name: item.name,
      detail: detail["Chi Tiết Dị Biến"],
      mainLoc: detail["Khu Vực Chính"],
      solver: [],
      isFinished: false,
      raw: detail
    };
  }).filter(item =&gt; item.name &amp;&amp; !existingNames.has(item.name));
}

function spawnRandomIncident(runtime, config) {
  const {randomCore, randomType} = config;
  const legalLocations = getLegalLocations(runtime);
  const baseLocation = pick(legalLocations || []) || "Đền Hakurei";
  const newIncidentName = `${baseLocation}${pick(randomCore || [])}${pick(randomType || [])}Dị biến`;
  const detail = {
    "Chi Tiết Dị Biến": "",
    "Khu Vực Chính": [ baseLocation ],
    "Dị Biến Kết Thúc": false
  };
  return {
    name: newIncidentName,
    detail: detail["Chi Tiết Dị Biến"],
    mainLoc: detail["Khu Vực Chính"],
    solver: [],
    isFinished: false,
    raw: detail
  };
}

function shouldTriggerNewIncident(stat, cache, config) {
  const {cooldownMinutes, forceTrigger} = config;
  const timeProgress = getTimeProgress(stat);
  const incidentCache = getIncidentCache(cache);
  const anchor = incidentCache.incidentCooldownAnchor;
  if (getCurrentIncident(stat)) {
    return {
      trigger: false,
      anchor: null
    };
  }
  if (forceTrigger) {
    return {
      trigger: true,
      anchor: null
    };
  }
  if (anchor === null || anchor === undefined) {
    return {
      trigger: false,
      anchor: timeProgress
    };
  }
  const remainingCooldown = cooldownMinutes - (timeProgress - anchor);
  incident_processor_processor_logger.debug("shouldTriggerNewIncident", `Điểm neo hồi chiêu: ${anchor}, Thời gian hồi chiêu còn lại: ${remainingCooldown} phút`);
  if (remainingCooldown <= 0) {
    return {
      trigger: true,
      anchor: null
    };
  } else {
    return {
      trigger: false,
      anchor
    };
  }
}

function getContinueDecision(stat, config) {
  const currentIncident = getCurrentIncident(stat);
  const {pool} = config;
  const poolEntry = (pool ?? []).find(item =&gt; item.name === currentIncident.name);
  currentIncident.detail = poolEntry?.detail || currentIncident.detail;
  incident_processor_processor_logger.debug("getContinueDecision", `Tiếp tục đẩy nhanh dị biến《${currentIncident.name}》，Địa điểm:`, currentIncident.mainLoc);
  return {
    decision: "continue",
    current: currentIncident,
    changes: []
  };
}

function getStartNewDecision(runtime, stat, config) {
  const {isRandomPool} = config;
  const availablePool = getAvailableIncidents(stat, config);
  let newIncident;
  const nextFromPool = isRandomPool ? pick(availablePool) : availablePool[0];
  if (nextFromPool) {
    newIncident = nextFromPool;
  } else {
    newIncident = spawnRandomIncident(runtime, config);
  }
  if (newIncident.mainLoc.length === 0) {
    newIncident.mainLoc = [ "Đền Hakurei" ];
  }
  incident_processor_processor_logger.debug("getStartNewDecision", `Kích hoạt dị biến mới《${newIncident.name}》，Địa điểm:`, newIncident.mainLoc);
  const path = `incidents.${newIncident.name}`;
  const newValue = {
    "Chi Tiết Dị Biến": newIncident.detail,
    "Khu Vực Chính": newIncident.mainLoc,
    "Dị Biến Kết Thúc": false
  };
  const oldValue = getIncidents(stat)[newIncident.name];
  setIncidents(stat, {
    ...getIncidents(stat),
    [newIncident.name]: newValue
  });
  const change = createChangeLogEntry("incident-processor", path, oldValue, newValue, `Kết thúc hồi chiêu, kích hoạt dị biến mới`);
  return {
    decision: "start_new",
    spawn: newIncident,
    changes: [ change ]
  };
}

function getDailyDecision(stat, cache, config) {
  const {cooldownMinutes} = config;
  const timeProgress = getTimeProgress(stat);
  const incidentCache = getIncidentCache(cache);
  const anchor = incidentCache.incidentCooldownAnchor ?? timeProgress;
  const remainingCooldown = anchor === null ? cooldownMinutes : Math.max(0, cooldownMinutes - (timeProgress - anchor));
  incident_processor_processor_logger.debug("getDailyDecision", "Cốt truyện thường ngày, dị biến mới đang trong thời gian hồi.");
  return {
    decision: "daily",
    remainingCooldown,
    changes: []
  };
}

function processIncident({runtime, stat, cache}) {
  const funcName = "processIncident";
  incident_processor_processor_logger.debug(funcName, "Bắt đầu xử lý dị biến...");
  const newStat = external_default().cloneDeep(stat);
  const newCache = external_default().cloneDeep(cache);
  const config = getIncidentConfig(newStat);
  try {
    const currentIncident = getCurrentIncident(newStat);
    const {trigger: shouldTrigger, anchor: newAnchor} = shouldTriggerNewIncident(newStat, newCache, config);
    let decisionResult;
    if (currentIncident) {
      decisionResult = getContinueDecision(newStat, config);
    } else if (shouldTrigger) {
      decisionResult = getStartNewDecision(runtime, newStat, config);
    } else {
      decisionResult = getDailyDecision(newStat, newCache, config);
    }
    const {decision, current, spawn, remainingCooldown, changes} = decisionResult;
    runtime.incident = {
      decision,
      current,
      spawn,
      remainingCooldown,
      isIncidentActive: !!currentIncident
    };
    const oldAnchor = getIncidentCache(cache).incidentCooldownAnchor;
    const finalAnchor = newAnchor ?? null;
    if (oldAnchor !== finalAnchor) {
      if (!newCache.incident) {
        newCache.incident = {};
      }
      newCache.incident.incidentCooldownAnchor = finalAnchor;
      changes.push(createChangeLogEntry("incident-processor", "cache.incident.incidentCooldownAnchor", oldAnchor, finalAnchor, "Cập nhật điểm neo hồi chiêu dị biến"));
    }
    incident_processor_processor_logger.debug(funcName, "Xử lý dị biến hoàn tất, runtime.incident=", runtime.incident);
    return {
      runtime,
      stat: newStat,
      changes,
      cache: newCache
    };
  } catch (err) {
    incident_processor_processor_logger.error(funcName, "Chạy thất bại: " + (err?.message || String(err)), err);
    runtime.incident = {
      decision: "daily",
      isIncidentActive: false,
      remainingCooldown: 0
    };
    return {
      runtime,
      stat,
      changes: [],
      cache
    };
  }
}

const incident_processor_logger = new Logger("GSKO-BASE/core/incident-processor");

async function processIncidentDecisions({stat, runtime}) {
  const funcName = "processIncidentDecisions";
  incident_processor_logger.debug(funcName, "Bắt đầu xử lý các quyết định dị biến...");
  try {
    const cache = getCache(stat);
    const {runtime: finalRuntime, stat: newStat, changes, cache: finalCache} = processIncident({
      runtime,
      stat,
      cache
    });
    applyCacheToStat(newStat, finalCache);
    incident_processor_logger.debug(funcName, "Hoàn tất xử lý các quyết định dị biến.");
    return {
      stat: newStat,
      runtime: finalRuntime,
      changes
    };
  } catch (e) {
    incident_processor_logger.error(funcName, "Đã xảy ra lỗi bất ngờ khi xử lý quyết định dị biến:", e);
    return {
      stat,
      runtime,
      changes: []
    };
  }
}

const mentioned_character_processor_logger = new Logger("GSKO-BASE/core/mentioned-character-processor");

async function mentionedCharacterProcessor({runtime, stat}) {
  const funcName = "mentionedCharacterProcessor";
  const updatedRuntime = external_default().cloneDeep(runtime);
  if (!updatedRuntime.character) {
    updatedRuntime.character = {
      chars: {},
      partitions: {
        coLocated: [],
        remote: []
      },
      mentionedCharIds: []
    };
  }
  const chars = updatedRuntime.character.chars;
  let mentionedCharIds = [];
  try {
    if (!chars || external_default().isEmpty(chars)) {
      mentioned_character_processor_logger.debug(funcName, "Danh sách nhân vật trống, trả về mảng rỗng.");
      updatedRuntime.character.mentionedCharIds = [];
      return updatedRuntime;
    }
    const charNameIdMap = new Map;
    const charNames = [];
    for (const id in chars) {
      const name = chars[id]?.name;
      if (name) {
        charNames.push(name);
        charNameIdMap.set(name, id);
      }
    }
    const {mainBodyTags, excludeBodyTags} = stat.config;
    const matchedNames = await matchMessages(charNames, {
      depth: 3,
      includeSwipes: false,
      mainBodyTags,
      excludeBodyTags
    });
    if (matchedNames.length &gt; 0) {
      mentioned_character_processor_logger.debug(funcName, `Tên nhân vật khớp trong tin nhắn: ${JSON.stringify(matchedNames)}`);
      const ids = matchedNames.map(name =&gt; charNameIdMap.get(name)).filter(id =&gt; !!id);
      mentionedCharIds = external_default().uniq(ids);
    }
    mentioned_character_processor_logger.debug(funcName, `ID nhân vật cuối cùng được nhận dạng: ${JSON.stringify(mentionedCharIds)}`);
  } catch (error) {
    mentioned_character_processor_logger.error(funcName, "Phát sinh lỗi khi xử lý nhân vật được nhắc đến", error);
    mentionedCharIds = [];
  }
  updatedRuntime.character.mentionedCharIds = mentionedCharIds;
  return updatedRuntime;
}

const location_logger = new Logger("GSKO-BASE/core/normalizer-processor/location");

function normalizeLocationData({originalStat, runtime}) {
  const funcName = "normalizeLocationData";
  location_logger.debug(funcName, "Bắt đầu tiến hành chuẩn hóa địa điểm...");
  const stat = external_default().cloneDeep(originalStat);
  const changeLog = [];
  try {
    const legalLocationsData = runtime?.area?.legal_locations ?? [];
    const legalLocations = new Set(legalLocationsData.map(loc =&gt; loc.name.trim()).filter(Boolean));
    const aliasToLegalName = new Map;
    for (const location of legalLocationsData) {
      const canonicalName = location.name?.trim();
      if (!canonicalName) continue;
      if (Array.isArray(location.aliases)) {
        for (const alias of location.aliases) {
          const trimmedAlias = alias?.trim?.();
          if (!trimmedAlias) continue;
          if (!aliasToLegalName.has(trimmedAlias)) {
            aliasToLegalName.set(trimmedAlias, canonicalName);
          }
        }
      }
    }
    if (legalLocations.size === 0) {
      location_logger.warn(funcName, "Danh sách địa điểm hợp lệ bị trống, bỏ qua việc chuẩn hóa địa điểm.");
      return {
        stat,
        changeLog
      };
    }
    const fallbackLocation = stat.world?.fallbackPlace ?? WORLD_DEFAULTS.fallbackPlace;
    const normalize = (rawLocation, defaultLocation, options) =&gt; {
      const {keepOnInvalid = false} = options || {};
      const locationString = String(Array.isArray(rawLocation) ? rawLocation[0] || "" : rawLocation || "").trim();
      if (!locationString) {
        return {
          isOk: false,
          fixedLocation: defaultLocation
        };
      }
      if (legalLocations.has(locationString)) {
        return {
          isOk: true,
          fixedLocation: locationString
        };
      }
      const aliasResolved = aliasToLegalName.get(locationString);
      if (aliasResolved) {
        return {
          isOk: true,
          fixedLocation: aliasResolved
        };
      }
      return keepOnInvalid ? {
        isOk: false,
        fixedLocation: locationString
      } : {
        isOk: false,
        fixedLocation: defaultLocation
      };
    };
    let userHome = stat.user[USER_FIELDS.home];
    let userLocation = stat.user[USER_FIELDS.currentLocation];
    if (userHome == null) {
      const oldValue = userHome;
      userHome = fallbackLocation;
      stat.user[USER_FIELDS.home] = userHome;
      changeLog.push(createChangeLogEntry(funcName, `user.${USER_FIELDS.home}`, oldValue, userHome, "Bổ sung khu vực sinh sống của người dùng"));
    }
    if (userLocation == null) {
      const oldValue = userLocation;
      userLocation = userHome;
      stat.user[USER_FIELDS.currentLocation] = userLocation;
      changeLog.push(createChangeLogEntry(funcName, `user.${USER_FIELDS.currentLocation}`, oldValue, userLocation, "Bổ sung vị trí hiện tại của người dùng"));
    }
    const userHomeNormalization = normalize(userHome, fallbackLocation);
    const userLocationFallback = userHomeNormalization.isOk ? userHomeNormalization.fixedLocation : fallbackLocation;
    const userLocationNormalization = normalize(userLocation, userLocationFallback);
    if (userHomeNormalization.fixedLocation !== userHome) {
      const oldValue = stat.user[USER_FIELDS.home];
      stat.user[USER_FIELDS.home] = userHomeNormalization.fixedLocation;
      changeLog.push(createChangeLogEntry(funcName, `user.${USER_FIELDS.home}`, oldValue, userHomeNormalization.fixedLocation, "Chỉnh sửa khu vực sinh sống của người dùng"));
    }
    if (userLocationNormalization.fixedLocation !== userLocation) {
      const oldValue = stat.user[USER_FIELDS.currentLocation];
      stat.user[USER_FIELDS.currentLocation] = userLocationNormalization.fixedLocation;
      changeLog.push(createChangeLogEntry(funcName, `user.${USER_FIELDS.currentLocation}`, oldValue, userLocationNormalization.fixedLocation, "Chỉnh sửa vị trí hiện tại của người dùng"));
    }
    for (const charName in stat.chars) {
      if (!Object.prototype.hasOwnProperty.call(stat.chars, charName)) continue;
      const charObject = stat.chars[charName];
      if (charName.startsWith("$") || !charObject) continue;
      let charHome = charObject[CHARACTER_FIELDS.home];
      let charLocation = charObject[CHARACTER_FIELDS.currentLocation];
      if (charHome == null) {
        const oldValue = charHome;
        charHome = fallbackLocation;
        charObject[CHARACTER_FIELDS.home] = charHome;
        changeLog.push(createChangeLogEntry(funcName, `chars.${charName}.${CHARACTER_FIELDS.home}`, oldValue, charHome, `Bổ sung khu vực sinh sống của nhân vật [${charName}]`));
      }
      if (charLocation == null) {
        const oldValue = charLocation;
        charLocation = charHome;
        charObject[CHARACTER_FIELDS.currentLocation] = charLocation;
        changeLog.push(createChangeLogEntry(funcName, `chars.${charName}.${CHARACTER_FIELDS.currentLocation}`, oldValue, charLocation, `Bổ sung vị trí hiện tại của nhân vật [${charName}]`));
      }
      const charHomeNormalization = normalize(charHome, fallbackLocation, {
        keepOnInvalid: true
      });
      const charLocationFallback = charHomeNormalization.isOk ? charHomeNormalization.fixedLocation : fallbackLocation;
      const charLocationNormalization = normalize(charLocation, charLocationFallback, {
        keepOnInvalid: true
      });
      if (charHomeNormalization.fixedLocation !== charHome) {
        const oldValue = charObject[CHARACTER_FIELDS.home];
        charObject[CHARACTER_FIELDS.home] = charHomeNormalization.fixedLocation;
        changeLog.push(createChangeLogEntry(funcName, `chars.${charName}.${CHARACTER_FIELDS.home}`, oldValue, charHomeNormalization.fixedLocation, `Chỉnh sửa khu vực sinh sống của nhân vật [${charName}]`));
      }
      if (charLocationNormalization.fixedLocation !== charLocation) {
        const oldValue = charObject[CHARACTER_FIELDS.currentLocation];
        charObject[CHARACTER_FIELDS.currentLocation] = charLocationNormalization.fixedLocation;
        changeLog.push(createChangeLogEntry(funcName, `chars.${charName}.${CHARACTER_FIELDS.currentLocation}`, oldValue, charLocationNormalization.fixedLocation, `Chỉnh sửa vị trí hiện tại của nhân vật [${charName}]`));
      }
    }
    location_logger.debug(funcName, "Chuẩn hóa địa điểm hoàn tất.", {
      changeLog
    });
  } catch (error) {
    location_logger.error(funcName, "Đã xảy ra lỗi khi thực thi chuẩn hóa địa điểm, dữ liệu gốc sẽ được giữ lại", error);
  }
  return {
    stat,
    changeLog
  };
}

function formatNewsEntry(entry) {
  const time = formatTime(entry.clockAck);
  const location = entry.location;
  const ayaTarget = `Aya đang ${entry.target}`;
  const otherChars = entry.otherCharacters.length &gt; 0 ? "đã gặp gỡ：" + entry.otherCharacters.map(char =&gt; `${char.name}(${char.target})`).join("、") : "không gặp ai khác";
  return `${time}；tại【${location}】；${ayaTarget}；${otherChars}。`;
}

function buildAyaNewsPrompt({runtime, stat}) {
  const currentAyaNews = AyaNewsSchema.safeParse(runtime.ayaNews);
  let ayaNewsContent;
  if (stat.AyaNews == null) {
    ayaNewsContent = "Tin tức vòng này";
  } else if (external_default().isEmpty(stat.AyaNews)) {
    ayaNewsContent = "Tạm thời không có";
  } else {
    ayaNewsContent = stat.AyaNews;
  }
  const previousAyaNewsPrompt = `Nội dung và cấu trúc tin tức của vòng trước có thể tham khảo như sau：\n${JSON.stringify({
    AyaNews: ayaNewsContent
  }, null, 2)}`;
  if (!currentAyaNews.success || external_default().isEmpty(currentAyaNews.data.entries)) {
    return previousAyaNewsPrompt;
  }
  const promptLines = currentAyaNews.data.entries.map(formatNewsEntry);
  const processedLines = external_default().chain(promptLines).uniq().value();
  if (external_default().isEmpty(processedLines)) {
    return previousAyaNewsPrompt;
  }
  const header = "Vòng này bắt buộc phải cập nhật biến ERA cho tin tức của Aya (lưu ý, không cập nhật trong chính văn, bắt buộc phải cập nhật vào biến). Hành trình của Aya trong ngày qua như sau：";
  const newHànhTrìnhPrompt = `${header}\n${processedLines.join("\n")}`;
  return `${previousAyaNewsPrompt}\n\n${newHànhTrìnhPrompt}`;
}

function buildCharacterMovementPrompt({runtime, stat}) {
  const playerLocation = runtime.characterDistribution?.playerLocation;
  if (!playerLocation) return [];
  const allChars = runtime.character?.chars;
  if (!allChars) return [];
  const prompts = [];
  for (const charId in allChars) {
    const charRuntime = allChars[charId];
    const decision = charRuntime.decision;
    if (!decision) continue;
    const {from, to, do: action} = decision;
    if (!from || !to || from === to) continue;
    const charName = getCharName(stat, charId);
    if (to === playerLocation &amp;&amp; from !== playerLocation) {
      prompts.push(`[${charName} **đã** từ ${from} đến đây, với mục đích là ${action}]`);
    }
    if (from === playerLocation &amp;&amp; to !== playerLocation) {
      prompts.push(`[${charName} **đã** rời khỏi đây để đi tới ${to}, với mục đích là ${action}]`);
    }
  }
  return prompts;
}

const co_located_characters_logger = new Logger("GSKO-BASE/core/prompt-builder/co-located-characters");

function buildCoLocatedCharactersPrompt({stat, runtime}) {
  const funcName = "buildCoLocatedCharactersPrompt";
  const coLocatedCharIds = runtime.character?.partitions?.coLocated;
  if (external_default().isEmpty(coLocatedCharIds)) {
    co_located_characters_logger.debug(funcName, "Không có nhân vật nào trong cùng khu vực, bỏ qua quá trình tạo prompt.");
    return "";
  }
  const charactersInfo = {};
  external_default().forEach(coLocatedCharIds, charId =&gt; {
    const charData = stat.chars[charId];
    if (!charData) {
      co_located_characters_logger.warn(funcName, `Không tìm thấy dữ liệu nhân vật cùng khu vực ${charId} trong stat.chars.`);
      return;
    }
    charactersInfo[charId] = {
      name: charData.name,
      "Độ hảo cảm": charData["Độ hảo cảm"],
      "Khu Vực Hiện Tại": charData["Khu Vực Hiện Tại"],
      "Khu vực sinh sống": charData["Khu vực sinh sống"],
      "Mục Tiêu": charData["Mục Tiêu"],
      "Tình trạng cơ thể": charData["Tình trạng cơ thể"],
      "Suy nghĩ nội tâm": charData["Suy nghĩ nội tâm"]
    };
  });
  if (external_default().isEmpty(charactersInfo)) {
    return "";
  }
  const charactersJson = JSON.stringify({
    chars: charactersInfo
  }, null, 2);
  const prompt = `\nDưới đây là các nhân vật và trạng thái của họ trong bối cảnh hiện tại. Tùy thuộc vào cốt truyện, bạn có thể đưa những nhân vật này vào hoặc đưa ra khỏi sự tương tác và cập nhật trạng thái của họ thông qua các câu lệnh biến ERA (nếu có thuộc tính nào 'đang chờ được điền', thì bạn **bắt buộc phải sử dụng dữ liệu thực để cập nhật nó**).\n\n${charactersJson}\n`;
  co_located_characters_logger.debug(funcName, "Tạo thành công prompt về các nhân vật cùng khu vực.");
  return prompt;
}

const co_located_characters_affection_logger = new Logger("GSKO-BASE/core/prompt-builder/co-located-characters-affection");

function buildCoLocatedCharsAffectionPrompt({stat, runtime}) {
  const funcName = "buildCoLocatedCharsAffectionPrompt";
  const coLocatedCharIds = runtime.character?.partitions?.coLocated;
  if (external_default().isEmpty(coLocatedCharIds)) {
    co_located_characters_affection_logger.debug(funcName, "Không có nhân vật nào trong cùng khu vực, bỏ qua quá trình tạo prompt.");
    return "";
  }
  const characterSummaries = [];
  external_default().forEach(coLocatedCharIds, charId =&gt; {
    const charData = stat.chars[charId];
    const charSettings = runtime.characterSettings?.[charId];
    if (!charData) {
      co_located_characters_affection_logger.warn(funcName, `Không tìm thấy dữ liệu nhân vật cùng khu vực ${charId} trong stat.chars.`);
      return;
    }
    if (!charSettings) {
      co_located_characters_affection_logger.warn(funcName, `Không tìm thấy cài đặt cho nhân vật ${charId} trong runtime.characterSettings.`);
      return;
    }
    const affection = charData["Độ hảo cảm"];
    const affectionStages = charSettings.affectionStages;
    const currentStage = pickAffectionStage(affection, affectionStages);
    if (!currentStage) {
      co_located_characters_affection_logger.warn(funcName, `Không thể xác định cấp độ hảo cảm của nhân vật ${charId}.`);
      return;
    }
    const stageName = currentStage.name || "Cấp độ không xác định";
    const stageDescribe = currentStage.describe || "Tạm thời không có mô tả";
    characterSummaries.push(`- ${charData.name}：Cấp độ hảo cảm hiện tại là「${stageName}」, ${stageDescribe}`);
  });
  if (characterSummaries.length === 0) {
    return "";
  }
  const promptLines = [ "Dưới đây là các cấp độ hảo cảm của các nhân vật ở cùng khu vực hiện tại và phần giải thích：", ...characterSummaries ];
  const prompt = promptLines.join("\n");
  co_located_characters_affection_logger.debug(funcName, "Đã tạo thành công prompt độ hảo cảm của nhân vật cùng khu vực.");
  return prompt;
}

const companion_decision_logger = new Logger("GSKO-BASE/core/prompt-builder/companion-decision");

function buildCompanionDecisionPrompt({stat, runtime}) {
  const funcName = "buildCompanionDecisionPrompt";
  const characterRuntimes = runtime.character?.chars;
  if (external_default().isEmpty(characterRuntimes)) {
    return "";
  }
  const prompts = [];
  external_default().forEach(characterRuntimes, (charRuntime, charId) =&gt; {
    const decision = charRuntime.companionDecision;
    if (!decision || !decision.do) {
      return;
    }
    const charName = getCharName(stat, charId);
    companion_decision_logger.debug(funcName, `Nhân vật ${charName} (${charId}) đang có quyết định đi cùng: ${decision.do}`);
    let prompt = `${charName} có vẻ muốn làm “${decision.do}”`;
    if (decision.to) {
      prompt += `, mục tiêu là “${decision.to}”`;
    }
    prompts.push(prompt);
  });
  if (prompts.length === 0) {
    return "";
  }
  const combinedPrompts = prompts.join("；");
  return `\nHiện tại, ${combinedPrompts}... nhưng họ cảm thấy đi chơi với nhân vật chính có vẻ thú vị hơn.`;
}

const festival_logger = new Logger("GSKO-BASE/core/prompt-builder/festival");

function buildFestivalPrompt({runtime}) {
  const funcName = "buildFestivalPrompt";
  const prompts = [];
  try {
    const festivalInfo = external_default().get(runtime, "festival");
    if (!festivalInfo) {
      festival_logger.debug(funcName, "Không có thông tin lễ hội trong runtime, bỏ qua.");
      return [];
    }
    const {current, next} = festivalInfo;
    if (current) {
      const nDays = current.end_day - current.start_day + 1;
      const customsText = (current.customs || []).join("Vui lòng để các nhân vật trong Ảo Tưởng Hương nhắc nhở {{user}} trong chính văn!!；");
      const line = `【Sự kiện quan trọng - Gợi ý Lễ hội】Hôm nay là「${current.name}」(Từ ${current.month}/${current.start_day} đến ${current.month}/${current.end_day}, kéo dài ${nDays} ngày), Địa điểm tổ chức: ${current.host}. Tập tục: ${customsText}`;
      prompts.push(line);
    }
    if (next) {
      const customsText = (next.customs || []).join("；");
      const line = `【Sự kiện quan trọng - Báo trước Lễ hội】「${next.name}」sẽ bắt đầu sau ${next.days_until} ngày (Từ ${next.month}/${next.start_day} đến ${next.month}/${next.end_day}), Địa điểm tổ chức: ${next.host}. Tập tục: ${customsText}`;
      prompts.push(line);
    }
    if (prompts.length &gt; 0) {
      festival_logger.debug(funcName, "Tạo prompt gợi ý lễ hội:", prompts);
    }
    return prompts;
  } catch (err) {
    festival_logger.error(funcName, "Chạy thất bại: " + (err?.message || String(err)), err);
    return [];
  }
}

const incident_logger = new Logger("GSKO-BASE/core/prompt-builder/incident");

function buildIncidentPrompt({runtime, stat}) {
  const funcName = "buildIncidentPrompt";
  const incidentInfo = runtime.incident;
  if (!incidentInfo || !incidentInfo.isIncidentActive) {
    incident_logger.debug(funcName, "Không có dị biến hoạt động, tạo prompt theo tiến trình cốt truyện thường ngày.");
    return __WEBPACK_EXTERNAL_MODULE_https_testingcf_jsdelivr_net_npm_dedent_esm_422736dc_default__`
      [Hiện tại không có dị biến]
      Vui lòng tiếp tục phát triển cốt truyện hàng ngày.
    `;
  }
  const activeIncident = incidentInfo.current ?? incidentInfo.spawn;
  if (!activeIncident) {
    incident_logger.debug(funcName, "Dị biến đã được kích hoạt nhưng không tìm thấy thông tin cụ thể, xây dựng prompt cốt truyện hàng ngày.");
    return __WEBPACK_EXTERNAL_MODULE_https_testingcf_jsdelivr_net_npm_dedent_esm_422736dc_default__`
      [Hiện tại không có dị biến]
      Vui lòng tiếp tục phát triển cốt truyện hàng ngày.
    `;
  }
  const promptParts = [ __WEBPACK_EXTERNAL_MODULE_https_testingcf_jsdelivr_net_npm_dedent_esm_422736dc_default__`
    [Chỉ thị quan trọng]
    Đang có một dị biến xảy ra, bạn bắt buộc phải thúc đẩy tình tiết dị biến tiếp tục phát triển.
    ` ];
  if (activeIncident.detail) {
    promptParts.push(__WEBPACK_EXTERNAL_MODULE_https_testingcf_jsdelivr_net_npm_dedent_esm_422736dc_default__`
      [Ảnh hưởng chính của dị biến hiện tại]
      ${activeIncident.detail}
    `);
  }
  if (activeIncident.raw &amp;&amp; activeIncident.name) {
    try {
      const wrappedStructure = {
        incidents: {
          [activeIncident.name]: activeIncident.raw
        }
      };
      const jsonStructure = JSON.stringify(wrappedStructure, null, 2);
      promptParts.push(__WEBPACK_EXTERNAL_MODULE_https_testingcf_jsdelivr_net_npm_dedent_esm_422736dc_default__`
        [Cấu trúc JSON của dị biến hiện tại]
        Dị biến đã được kích hoạt như sau, bạn có thể cần phải chỉnh sửa nội dung bên dưới hoặc dựa vào nội dung đó để tạo cốt truyện:
        \`\`\`json
        ${jsonStructure}
        \`\`\`
      `);
    } catch (error) {
      incident_logger.error(funcName, "Lỗi khi chuyển đổi cấu trúc JSON của dị biến:", error);
    }
  }
  incident_logger.debug(funcName, "Tạo thành công prompt dị biến.");
  return promptParts.join("\n\n");
}

function buildLegalLocationsPrompt({runtime}) {
  const legalLocations = runtime.area?.legal_locations;
  if (external_default().isEmpty(legalLocations)) {
    return "";
  }
  if (!legalLocations) {
    return "";
  }
  const locationsString = legalLocations.map(loc =&gt; loc.name).join(", ");
  const prompt = `【Địa điểm hợp lệ】: Dưới đây là tất cả các tên địa điểm hợp pháp trong thời điểm hiện tại: [${locationsString}]. Trong quá trình cập nhật bất kỳ biến nào liên quan đến địa điểm, bạn chỉ được phép sử dụng các địa điểm nằm trong danh sách trên.`;
  return prompt;
}

const main_body_wrapper_tag_logger = new Logger("main-body-wrapper-tag");

function buildMainBodyWrapperTagPrompt({stat}) {
  const funcName = "buildMainBodyWrapperTagPrompt";
  try {
    if (!stat) {
      main_body_wrapper_tag_logger.debug(funcName, "Đối tượng Stat bị trống, bỏ qua.");
      return null;
    }
    const tags = stat.config?.mainBodyTags;
    if (!tags || tags.length === 0) {
      main_body_wrapper_tag_logger.debug(funcName, "config.mainBodyTags chưa được thiết lập hoặc bị trống, bỏ qua.");
      return null;
    }
    const tagExamples = tags.map(tag =&gt; {
      const L = "<";
      const R = "&gt;";
      const SL = "/";
      return `${L}${tag}${R}...${L}${SL}${tag}${R}`;
    }).join(" hoặc ");
    const prompt = __WEBPACK_EXTERNAL_MODULE_https_testingcf_jsdelivr_net_npm_dedent_esm_422736dc_default__`
      Vui lòng trong câu trả lời của bạn, bao bọc phần chính văn của câu chuyện bằng thẻ ${tagExamples}.
    `;
    main_body_wrapper_tag_logger.debug(funcName, "Tạo prompt về nhãn bao bọc phần chính văn thành công.", {
      prompt
    });
    return prompt;
  } catch (err) {
    main_body_wrapper_tag_logger.error(funcName, "Tạo prompt nhãn bao bọc phần chính văn thất bại: " + (err?.message || String(err)), err);
    return null;
  }
}

const main_character_logger = new Logger("GSKO-BASE/core/prompt-builder/main-character");

function buildMainCharacterPrompt({stat}) {
  const funcName = "buildMainCharacterPrompt";
  try {
    const user = stat?.user;
    if (!user) {
      main_character_logger.warn(funcName, "Đang tiến hành tạo prompt cho nhân vật chính.");
      return null;
    }
    const userJson = JSON.stringify({
      user
    }, null, 2);
    const header = "Gợi ý trạng thái của nhân vật chính: Hãy cập nhật lời trần thuật và trạng thái của nhân vật chính dựa trên cấu trúc JSON sau.";
    const prompt = `${header}\n${userJson}\n`;
    main_character_logger.debug(funcName, "Hoàn tất tạo prompt cho nhân vật chính.");
    return prompt;
  } catch (err) {
    main_character_logger.error(funcName, "Lỗi tạo prompt nhân vật chính: " + (err?.message || String(err)), err);
    return null;
  }
}

const remote_mentioned_characters_logger = new Logger("RemoteMentioned");

function buildRemoteMentionedCharactersPrompt({stat, runtime}) {
  const funcName = "buildRemoteMentionedCharactersPrompt";
  const mentionedCharIds = runtime.character?.mentionedCharIds;
  const coLocatedCharIds = runtime.character?.partitions?.coLocated ?? [];
  if (external_default().isEmpty(mentionedCharIds)) {
    remote_mentioned_characters_logger.debug(funcName, "Không có nhân vật nào được nhắc tới, bỏ qua việc tạo prompt.");
    return "";
  }
  const remoteMentionedIds = external_default().difference(mentionedCharIds, coLocatedCharIds);
  if (external_default().isEmpty(remoteMentionedIds)) {
    remote_mentioned_characters_logger.debug(funcName, "Toàn bộ nhân vật được nhắc tới đều đang có mặt, không cần tạo prompt này.");
    return "";
  }
  const charactersInfo = {};
  external_default().forEach(remoteMentionedIds, charId =&gt; {
    const charData = stat.chars[charId];
    if (!charData) {
      remote_mentioned_characters_logger.warn(funcName, `Trong stat.chars không tìm thấy dữ liệu về nhân vật được nhắc tới ${charId}.`);
      return;
    }
    charactersInfo[charId] = {
      name: charData.name,
      "Độ hảo cảm": charData["Độ hảo cảm"],
      "Khu Vực Hiện Tại": charData["Khu Vực Hiện Tại"],
      "Khu vực sinh sống": charData["Khu vực sinh sống"],
      "Mục Tiêu": charData["Mục Tiêu"],
      "Tình trạng cơ thể": charData["Tình trạng cơ thể"],
      "Suy nghĩ nội tâm": charData["Suy nghĩ nội tâm"]
    };
  });
  if (external_default().isEmpty(charactersInfo)) {
    return "";
  }
  const charactersJson = JSON.stringify({
    chars: charactersInfo
  }, null, 2);
  const prompt = `\nCác nhân vật sau đã được nhắc đến trong các cuộc hội thoại gần đây, nhưng họ hiện không có mặt. Tùy thuộc vào bối cảnh cốt truyện hiện tại, vui lòng kiểm tra các biến trạng thái của họ và tiến hành những điều chỉnh cần thiết bằng cách sử dụng các lệnh cập nhật biến ERA.\n\n${charactersJson}\n`;
  remote_mentioned_characters_logger.debug(funcName, "Tạo prompt cho 'nhân vật được nhắc đến nhưng không có mặt' thành công.");
  return prompt;
}

const prompt_builder_route_logger = new Logger("GSKO-BASE/core/prompt-builder/route");

function formatPath(path) {
  if (!path || !path.steps || path.steps.length === 0) {
    return "";
  }
  return path.steps.map(step =&gt; `${step.from}-&gt;${step.to}`).join("→");
}

function buildRoutePrompt({runtime, stat}) {
  const funcName = "buildRoutePrompt";
  const routeInfo = runtime.area?.route;
  const currentUserLocation = stat.user?.[USER_FIELDS.currentLocation] ?? WORLD_DEFAULTS.fallbackPlace;
  const characterName = stat.user?.[USER_FIELDS.name] ?? "Bạn";
  if (!routeInfo || external_default().isEmpty(routeInfo.routes)) {
    return `【Gợi ý Tuyến đường】${characterName} hiện đang ở ${currentUserLocation}, tạm thời chưa phát hiện điểm đến có thể tới.`;
  }
  const lines = routeInfo.routes.map(route =&gt; {
    const pathString = formatPath(route.path);
    if (!pathString) return "";
    return `Tuyến đường đến ${route.destination} (${route.path.hops} bước): ${pathString}`;
  }).filter(Boolean);
  if (lines.length === 0) {
    return `【Gợi ý Tuyến đường】${characterName} hiện đang ở ${currentUserLocation}, tạm thời chưa phát hiện điểm đến có thể tới.`;
  }
  const prompt = `【Gợi ý Tuyến đường】Vui lòng di chuyển theo các tuyến đường sau (Vị trí hiện tại: ${currentUserLocation}):\n- ${lines.join("\n- ")}`;
  prompt_builder_route_logger.debug(funcName, "Prompt tuyến đường đã tạo:", prompt);
  return prompt;
}

const time_logger = new Logger("GSKO-BASE/core/prompt-builder/time");

function buildTimePrompt({runtime}) {
  const funcName = "buildTimePrompt";
  try {
    const now = external_default().get(runtime, "clock.now");
    const flags = external_default().get(runtime, "clock.flags");
    if (!now || !flags) {
      time_logger.warn(funcName, "runtime.clock.now hoặc runtime.clock.flags không tồn tại, không thể xây dựng prompt về thời gian.");
      return null;
    }
    const year = now.year ?? 0;
    const month = now.month ?? 0;
    const day = now.day ?? 0;
    const weekdayName = now.weekdayName || "Tuần?";
    const hourMinute = now.hm || (Number.isFinite(now.hour) &amp;&amp; Number.isFinite(now.minute) ? String(now.hour).padStart(2, "0") + ":" + String(now.minute).padStart(2, "0") : "--:--");
    const periodName = now.periodName || "—";
    const seasonName = now.seasonName || "";
    const monthString = String(month).padStart(2, "0");
    const dayString = String(day).padStart(2, "0");
    const line1 = `【Đồng hồ thế giới lượt hiện tại】Bây giờ là ${year} Năm ${monthString} Tháng ${dayString} Ngày (${weekdayName}) ${hourMinute} · ${periodName}${seasonName ? " · " + seasonName : ""}`;
    const changes = [];
    if (flags.newYear) changes.push("Năm mới");
    if (flags.newMonth) changes.push("Tháng mới");
    if (flags.newWeek) changes.push("Tuần mới");
    if (flags.newDay) changes.push("Ngày mới");
    if (flags.newSeason) changes.push("Mùa mới" + (seasonName ? `(${seasonName})` : ""));
    if (flags.newPeriod) changes.push("Khung giờ mới" + (periodName ? `(${periodName})` : ""));
    const line2 = changes.length ? `【Biến động thời gian ở lượt trước】${changes.join("，")}。` : "";
    const result = line2 ? line1 + "\n" + line2 : line1;
    time_logger.debug(funcName, "Đã tạo thành công prompt thời gian.", {
      result
    });
    return result;
  } catch (err) {
    time_logger.error(funcName, "Thất bại trong việc tạo prompt thời gian: " + (err?.message || String(err)), err);
    return null;
  }
}

const time_progress_logger = new Logger("GSKO-BASE/core/prompt-builder/time-progress");

function buildTimeProgressPrompt({stat}) {
  const funcName = "buildTimeProgressPrompt";
  try {
    const world = stat?.["time"];
    const timeProgress = world?.timeProgress;
    if (typeof timeProgress !== "number" || Number.isNaN(timeProgress)) {
      time_progress_logger.warn(funcName, "stat.time.timeProgress bị khuyết thiếu hoặc không hợp lệ, bỏ qua gợi ý về tiến trình thời gian.");
      return null;
    }
    const snapshot = {
      time: {
        timeProgress
      }
    };
    const promptLines = [ "Gợi ý về tiến trình thời gian: Dưới đây sẽ hiển thị cấu trúc thực tế và giá trị hiện tại của biến timeProgress đại diện cho số phút đã trôi qua trong thế giới.", "Hãy ước tính số phút sẽ được bổ sung dựa trên diễn biến cốt truyện của lượt này, cộng dồn vào giá trị đó và lưu lại kết quả đã cập nhật.", JSON.stringify(snapshot, null, 2) ];
    const prompt = promptLines.join("\n");
    time_progress_logger.debug(funcName, "Tạo thành công prompt về tiến trình thời gian.");
    return prompt;
  } catch (err) {
    time_progress_logger.error(funcName, "Quá trình tạo prompt tiến trình thời gian thất bại: " + (err?.message || String(err)), err);
    return null;
  }
}

const weather_logger = new Logger("GSKO-BASE/core/prompt-builder/weather");

function buildWeatherPrompt({runtime}) {
  const funcName = "buildWeatherPrompt";
  try {
    const weather = runtime?.weather;
    if (!weather || !Array.isArray(weather.days) || weather.days.length === 0) {
      weather_logger.debug(funcName, "Thiếu weather.days, bỏ qua prompt về thời tiết.");
      return null;
    }
    const today = weather.days[0];
    const tomorrow = weather.days[1];
    const lines = [];
    if (today) {
      lines.push(formatWeatherLine("Hôm nay", today));
    }
    if (tomorrow) {
      lines.push(formatWeatherLine("Ngày mai", tomorrow));
    }
    if (lines.length === 0) {
      return null;
    }
    const prompt = [ "Tình hình thời tiết：", ...lines.map(line =&gt; `- ${line}`) ].join("\n");
    weather_logger.debug(funcName, "Tạo thành công prompt thời tiết.", {
      prompt
    });
    return prompt;
  } catch (err) {
    weather_logger.error(funcName, "Quá trình tạo prompt thời tiết thất bại: " + (err?.message || String(err)), err);
    return null;
  }
}

function formatWeatherLine(label, day) {
  const condition = day.condition?.label || "Thời tiết không xác định";
  const temp = formatTemperature(day);
  const precipitation = formatPercent(day.precipitationChance);
  const humidity = formatPercent(day.humidity);
  const wind = Number.isFinite(day.windLevel) ? `Cấp ${day.windLevel}` : "Sức gió không xác định";
  const detailParts = [ `Nhiệt độ ${temp}`, `Lượng mưa ${precipitation}`, `Độ ẩm ${humidity}`, `Sức gió ${wind}` ];
  const detail = detailParts.join("，");
  return `${label}：${condition}，${detail}。`;
}

function formatTemperature(day) {
  const temperature = day.temperature;
  const maxValue = temperature?.maxC;
  const minValue = temperature?.minC;
  const max = Number.isFinite(maxValue) ? `${maxValue}°C` : "Chưa rõ";
  const min = Number.isFinite(minValue) ? `${minValue}°C` : "Chưa rõ";
  return `${max} / ${min}`;
}

function formatPercent(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "Chưa rõ";
  }
  return `${Math.round(value * 100)}%`;
}

const prompt_builder_logger = new Logger("GSKO-BASE/core/prompt-builder");

function buildPrompt({runtime, stat}) {
  const funcName = "buildPrompt";
  prompt_builder_logger.debug(funcName, "Bắt đầu tạo các câu lệnh prompt...");
  const prompts = [];
  prompts.push("<Tiêu chuẩn biên soạn cốt truyện&gt;");
  prompts.push("**Sau đây là các** tiêu chuẩn cốt lõi** để biên soạn cốt truyện mới nhất, bạn bắt buộc phải tuân thủ nghiêm ngặt các thiết lập sau đây trong quá trình sáng tác.**");
  const timePrompt = buildTimePrompt({
    runtime
  });
  if (timePrompt) {
    prompts.push(timePrompt);
  }
  const weatherPrompt = buildWeatherPrompt({
    runtime
  });
  if (weatherPrompt) {
    prompts.push(weatherPrompt);
  }
  const festivalPrompts = buildFestivalPrompt({
    runtime
  });
  if (festivalPrompts.length &gt; 0) {
    prompts.push(...festivalPrompts);
  }
  const incidentPrompt = buildIncidentPrompt({
    runtime,
    stat
  });
  if (incidentPrompt) {
    prompts.push(incidentPrompt);
  }
  prompts.push("**Trên đây là các** tiêu chuẩn cốt lõi** để biên soạn cốt truyện mới nhất, bạn bắt buộc phải tuân thủ nghiêm ngặt các thiết lập trên trong quá trình sáng tác.**");
  prompts.push("</Tiêu chuẩn biên soạn cốt truyện&gt;");
  prompts.push("<Cốt lõi cho sự nhập vai&gt;");
  prompts.push("**Để nâng cao sự chân thực (tính nhập vai) trong cốt truyện mà bạn tạo ra, hãy tham khảo các nội dung dưới đây để sáng tác diễn biến mới.**");
  const routePrompt = buildRoutePrompt({
    runtime,
    stat
  });
  if (routePrompt) {
    prompts.push(routePrompt);
  }
  const characterMovementPrompts = buildCharacterMovementPrompt({
    runtime,
    stat
  });
  if (characterMovementPrompts.length &gt; 0) {
    prompts.push(...characterMovementPrompts);
  }
  const coLocatedCharsAffectionPrompt = buildCoLocatedCharsAffectionPrompt({
    runtime,
    stat
  });
  if (coLocatedCharsAffectionPrompt) {
    prompts.push(coLocatedCharsAffectionPrompt);
  }
  const companionDecisionPrompt = buildCompanionDecisionPrompt({
    runtime,
    stat
  });
  if (companionDecisionPrompt) {
    prompts.push(companionDecisionPrompt);
  }
  prompts.push("**Để nâng cao sự chân thực (tính nhập vai) trong cốt truyện mà bạn tạo ra, hãy tham khảo các nội dung trên đây để sáng tác diễn biến mới.**");
  prompts.push("</Cốt lõi cho sự nhập vai&gt;");
  prompts.push("<Các biến ERA **Bắt buộc** phải cập nhật trong lượt này&gt;");
  prompts.push("**Dưới đây là các biến và cấu trúc biến mà bạn BẮT BUỘC phải cập nhật theo luật lệ chỉnh sửa biến ERA trong lượt này.**");
  const ayaNewsPrompt = buildAyaNewsPrompt({
    runtime,
    stat
  });
  if (ayaNewsPrompt) {
    prompts.push(ayaNewsPrompt);
  }
  const legalLocationsPrompt = buildLegalLocationsPrompt({
    runtime
  });
  if (legalLocationsPrompt) {
    prompts.push(legalLocationsPrompt);
  }
  const mainCharacterPrompt = buildMainCharacterPrompt({
    stat
  });
  if (mainCharacterPrompt) {
    prompts.push(mainCharacterPrompt);
  }
  const timeProgressPrompt = buildTimeProgressPrompt({
    stat
  });
  if (timeProgressPrompt) {
    prompts.push(timeProgressPrompt);
  }
  const coLocatedCharactersPrompt = buildCoLocatedCharactersPrompt({
    runtime,
    stat
  });
  if (coLocatedCharactersPrompt) {
    prompts.push(coLocatedCharactersPrompt);
  }
  const remoteMentionedCharactersPrompt = buildRemoteMentionedCharactersPrompt({
    runtime,
    stat
  });
  if (remoteMentionedCharactersPrompt) {
    prompts.push(remoteMentionedCharactersPrompt);
  }
  prompts.push("**Trên đây là các biến và cấu trúc biến mà bạn BẮT BUỘC phải cập nhật theo luật lệ chỉnh sửa biến ERA trong lượt này.**");
  prompts.push("</Các biến ERA **Bắt buộc** phải cập nhật trong lượt này&gt;");
  const mainBodyWrapperTagPrompt = buildMainBodyWrapperTagPrompt({
    stat
  });
  if (mainBodyWrapperTagPrompt) {
    prompts.push("<Yêu cầu về định dạng&gt;");
    prompts.push(mainBodyWrapperTagPrompt);
    prompts.push("Và sau đó, bạn **bắt buộc phải sinh ra mã `variablThink` (câu lệnh suy nghĩ cập nhật biến) NẰM NGOÀI các nhãn chính văn đó** sau khi đã tạo xong cốt truyện, đồng thời tạo ra các khối cập nhật biến tương ứng theo nội dung của `think`.");
    prompts.push("</Yêu cầu về định dạng&gt;");
  }
  const finalPrompt = prompts.join("\n\n");
  prompt_builder_logger.debug(funcName, "Các câu lệnh prompt đã được tạo xong.");
  return finalPrompt;
}

function emitAndListen({emitEventName, emitPayload, listenEventName, filter}) {
  return new Promise(resolve =&gt; {
    const listener = detail =&gt; {
      if (filter(detail)) {
        eventRemoveListener(listenEventName, listener);
        resolve(detail);
      }
    };
    eventOn(listenEventName, listener);
    eventEmit(emitEventName, emitPayload);
  });
}

const WRITE_EVENT_MAP = {
  insertByObject: constants_ERA_EVENT_NAMES.INSERT_BY_OBJECT,
  updateByObject: constants_ERA_EVENT_NAMES.UPDATE_BY_OBJECT,
  insertByPath: constants_ERA_EVENT_NAMES.INSERT_BY_PATH,
  updateByPath: constants_ERA_EVENT_NAMES.UPDATE_BY_PATH,
  deleteByObject: constants_ERA_EVENT_NAMES.DELETE_BY_OBJECT,
  deleteByPath: constants_ERA_EVENT_NAMES.DELETE_BY_PATH
};

async function performWrite(operation, payload, waitForResponse = false) {
  const eventName = WRITE_EVENT_MAP[operation];
  if (waitForResponse) {
    return emitAndListen({
      emitEventName: eventName,
      emitPayload: payload,
      listenEventName: ERA_BROADCAST_EVENT_NAMES.WRITE_DONE,
      filter: p =&gt; p.actions.apiWrite
    });
  } else {
    eventEmit(eventName, payload);
    return Promise.resolve();
  }
}

function insertByObject(payload, waitForResponse) {
  return performWrite("insertByObject", payload, waitForResponse);
}

function updateByObject(payload, waitForResponse) {
  return performWrite("updateByObject", payload, waitForResponse);
}

function insertByPath(payload, waitForResponse) {
  return performWrite("insertByPath", payload, waitForResponse);
}

function updateByPath(payload, waitForResponse) {
  return performWrite("updateByPath", payload, waitForResponse);
}

function deleteByObject(payload, waitForResponse) {
  return performWrite("deleteByObject", payload, waitForResponse);
}

function deleteByPath(payload, waitForResponse) {
  return performWrite("deleteByPath", payload, waitForResponse);
}

const QUERY_EVENT_MAP = {
  getCurrentVars: constants_ERA_EVENT_NAMES.GET_CURRENT_VARS,
  getSnapshotAtMk: constants_ERA_EVENT_NAMES.GET_SNAPSHOT_AT_MK,
  getSnapshotsBetweenMks: constants_ERA_EVENT_NAMES.GET_SNAPSHOTS_BETWEEN_MKS,
  getSnapshotAtMId: constants_ERA_EVENT_NAMES.GET_SNAPSHOT_AT_MID,
  getSnapshotsBetweenMIds: constants_ERA_EVENT_NAMES.GET_SNAPSHOTS_BETWEEN_MIDS
};

function performQuery(operation, payload) {
  const eventName = QUERY_EVENT_MAP[operation];
  const queryType = operation;
  return emitAndListen({
    emitEventName: eventName,
    emitPayload: payload,
    listenEventName: constants_ERA_BROADCAST_EVENT_NAMES.QUERY_RESULT,
    filter: p =&gt; p.queryType === queryType &amp;&amp; external_default().isEqual(p.request, payload)
  });
}

function getCurrentVars() {
  return performQuery("getCurrentVars", {});
}

function getSnapshotAtMk(payload) {
  return performQuery("getSnapshotAtMk", payload);
}

function getSnapshotsBetweenMks(payload) {
  return performQuery("getSnapshotsBetweenMks", payload);
}

function getSnapshotsBetweenMks_fake(payload) {
  return new Promise(resolve =&gt; {
    eventOnce("dev:fakeSnapshotsResponse", response =&gt; {
      resolve(response.result);
    });
    eventEmit("dev:getSnapshotsBetweenMks", payload);
  });
}

function getSnapshotAtMId(payload) {
  return performQuery("getSnapshotAtMId", payload);
}

function getSnapshotsBetweenMIds(payload) {
  return performQuery("getSnapshotsBetweenMIds", payload);
}

function requestWriteDone() {
  eventEmit(ERA_EVENT_NAMES.REQUEST_WRITE_DONE, {});
}

const snapshot_fetcher_logger = new Logger("GSKO-BASE/core/snapshot-fetcher");

async function fetchSnapshotsForTimeFlags({runtime, mk, isFake}) {
  const funcName = "fetchSnapshotsForTimeFlags";
  if (!mk) {
    snapshot_fetcher_logger.debug(funcName, "Thiếu tham số mk hiện tại, bỏ qua việc lấy snapshot.");
    return runtime;
  }
  const {clock} = runtime;
  if (!clock?.flags || !clock.mkAnchors) {
    snapshot_fetcher_logger.debug(funcName, "Thiếu dữ liệu clock, bỏ qua việc lấy snapshot.");
    return runtime;
  }
  let highestFlag = null;
  for (const key of CLOCK_ROOT_FLAG_KEYS) {
    if (clock.flags[key]) {
      highestFlag = key;
    }
  }
  if (!highestFlag) {
    snapshot_fetcher_logger.debug(funcName, "Không có flag thời gian nào đang kích hoạt, không cần lấy snapshot.");
    return runtime;
  }
  const startMk = clock.mkAnchors[highestFlag];
  if (!startMk) {
    snapshot_fetcher_logger.warn(funcName, `Đã tìm thấy flag kích hoạt "${highestFlag}", nhưng bị thiếu startMk tương ứng.`);
    return runtime;
  }
  const endMk = mk;
  snapshot_fetcher_logger.debug(funcName, `Đang chuẩn bị lấy snapshot, phạm vi: [${startMk}, ${endMk}]`);
  try {
    const snapshotPayload = isFake ? await getSnapshotsBetweenMks_fake({
      startMk,
      endMk
    }) : await getSnapshotsBetweenMks({
      startMk,
      endMk
    });
    const snapshots = snapshotPayload.result || [];
    runtime.snapshots = snapshots;
    snapshot_fetcher_logger.debug(funcName, `Đã lấy và lưu thành công ${snapshots.length} mục snapshot vào runtime.`);
  } catch (error) {
    snapshot_fetcher_logger.error(funcName, "Có lỗi xảy ra trong quá trình lấy snapshot:", error);
    runtime.snapshots = [];
  }
  return runtime;
}

const anchor_limiter_logger = new Logger("GSKO-BASE/core/time-chat-mk-sync/anchor-limiter");

const toNumberLimit = value =&gt; {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }
  const normalized = Math.max(0, Math.floor(value));
  return normalized;
};

const collectMkList = selectedMks =&gt; selectedMks.filter(value =&gt; typeof value === "string" &amp;&amp; value.length &gt; 0);

const resolveLimit = (limits, key) =&gt; {
  if (!limits) {
    return null;
  }
  return toNumberLimit(limits[key]);
};

function clampTimeChatMkAnchors({runtime, stat, selectedMks, mk}) {
  const funcName = "clampTimeChatMkAnchors";
  const {clock} = runtime;
  if (!clock) {
    anchor_limiter_logger.debug(funcName, "runtime.clock không tồn tại, bỏ qua giới hạn neo (anchor limiter).");
    return runtime;
  }
  const {flags, mkAnchors} = clock;
  if (!flags || !mkAnchors) {
    anchor_limiter_logger.debug(funcName, "Bị khuyết thiếu clock.flags hoặc mkAnchors, bỏ qua giới hạn neo.", {
      hasFlags: Boolean(flags),
      hasAnchors: Boolean(mkAnchors)
    });
    return runtime;
  }
  const {config} = stat;
  const timeConfig = config?.time;
  const limits = timeConfig?.flagHistoryLimits;
  if (!limits || Object.keys(limits).length === 0) {
    anchor_limiter_logger.debug(funcName, "Cấu hình chưa định nghĩa flagHistoryLimits, bỏ qua giới hạn neo.");
    return runtime;
  }
  anchor_limiter_logger.debug(funcName, "Đã tiến hành tải cấu hình flagHistoryLimits.", {
    limits
  });
  const mkList = collectMkList(selectedMks);
  if (mkList.length === 0) {
    anchor_limiter_logger.debug(funcName, "selectedMks trống hoặc không có MK nào hợp lệ, bỏ qua giới hạn neo.");
    return runtime;
  }
  anchor_limiter_logger.debug(funcName, "Đã phân tích các selectedMks hợp lệ.", {
    mkList
  });
  const initialMk = typeof mk === "string" &amp;&amp; mk.length &gt; 0 ? mk : mkList[mkList.length - 1];
  let currentIndex = mkList.lastIndexOf(initialMk);
  if (currentIndex < 0) {
    currentIndex = mkList.length - 1;
    anchor_limiter_logger.debug(funcName, "MK hiện tại không nằm trong selectedMks, chuyển sang sử dụng mục mới nhất làm chỉ mục hiện hành.", {
      originalMk: initialMk,
      resolvedMk: mkList[currentIndex]
    });
  }
  const currentMk = mkList[currentIndex];
  const anchors = mkAnchors;
  const previousAnchors = clock.previousMkAnchors ?? {};
  let changed = false;
  const clampAnchor = options =&gt; {
    const {baseAnchorGetter, currentAnchorGetter, anchorSetter, limit, flagActive, logKey} = options;
    if (!flagActive) {
      anchor_limiter_logger.debug(funcName, "Cờ (flag) chưa được kích hoạt, bỏ qua giới hạn.", {
        logKey
      });
      return;
    }
    const baseAnchor = baseAnchorGetter() ?? null;
    const currentAnchor = currentAnchorGetter() ?? null;
    const applyAnchor = (value, reason) =&gt; {
      if (currentAnchor !== value) {
        anchorSetter(value);
        changed = true;
        anchor_limiter_logger.debug(funcName, reason, {
          logKey,
          value,
          previous: currentAnchor
        });
      }
    };
    if (limit == null) {
      if (baseAnchor &amp;&amp; baseAnchor !== currentAnchor) {
        applyAnchor(baseAnchor, "Chưa được cấu hình giới hạn, khôi phục lại điểm neo trong lịch sử.");
      } else {
        anchor_limiter_logger.debug(funcName, "Không tìm được giá trị giới hạn tương ứng, bỏ qua giới hạn.", {
          logKey
        });
      }
      return;
    }
    const anchorIndex = baseAnchor ? mkList.lastIndexOf(baseAnchor) : -1;
    const distance = anchorIndex &gt;= 0 ? currentIndex - anchorIndex : Number.POSITIVE_INFINITY;
    if (baseAnchor &amp;&amp; anchorIndex &gt;= 0 &amp;&amp; distance <= limit) {
      if (baseAnchor !== currentAnchor) {
        applyAnchor(baseAnchor, "Khoảng cách điểm neo nằm trong phạm vi giới hạn, khôi phục lại điểm neo trong lịch sử.");
      } else {
        anchor_limiter_logger.debug(funcName, "Khoảng cách điểm neo nằm trong phạm vi giới hạn, không cần tinh chỉnh thêm.", {
          logKey,
          limit,
          anchorMk: baseAnchor,
          anchorIndex,
          currentMk,
          currentIndex,
          distance
        });
      }
      return;
    }
    const targetIndex = Math.max(currentIndex - limit, 0);
    const targetMk = mkList[targetIndex] ?? mkList[0] ?? null;
    if (!targetMk) {
      anchor_limiter_logger.warn(funcName, "Không tìm được MK đích (target MK), giữ nguyên điểm neo gốc.", {
        logKey,
        limit,
        targetIndex,
        baseAnchor
      });
      return;
    }
    applyAnchor(targetMk, baseAnchor &amp;&amp; anchorIndex &gt;= 0 ? "Điểm neo đã bị định vị lại theo giới hạn." : "Điểm neo trong lịch sử bị khuyết thiếu, chọn điểm neo dự phòng căn cứ vào giới hạn.");
    anchor_limiter_logger.debug(funcName, "Chi tiết quá trình điều chỉnh giới hạn điểm neo", {
      logKey,
      limit,
      baseAnchor,
      anchorIndex,
      targetMk,
      targetIndex,
      currentMk,
      currentIndex,
      originalDistance: distance
    });
  };
  for (const key of CLOCK_ROOT_FLAG_KEYS) {
    clampAnchor({
      baseAnchorGetter: () =&gt; previousAnchors[key] ?? anchors[key],
      currentAnchorGetter: () =&gt; anchors[key],
      anchorSetter: value =&gt; {
        if (anchors[key] !== value) {
          anchors[key] = value;
        }
      },
      limit: resolveLimit(limits, key),
      flagActive: flags[key],
      logKey: key
    });
  }
  if (flags.byPeriod) {
    anchors.period = anchors.period ?? {};
    const periodLimits = limits.period;
    for (const key of BY_PERIOD_KEYS) {
      const limit = periodLimits ? toNumberLimit(periodLimits[key]) : null;
      clampAnchor({
        baseAnchorGetter: () =&gt; previousAnchors.period?.[key] ?? anchors.period?.[key],
        currentAnchorGetter: () =&gt; anchors.period?.[key],
        anchorSetter: value =&gt; {
          anchors.period = anchors.period ?? {};
          if (anchors.period[key] !== value) {
            anchors.period[key] = value;
          }
        },
        limit,
        flagActive: Boolean(flags.byPeriod[key]),
        logKey: `period.${key}`
      });
    }
  }
  if (flags.bySeason) {
    anchors.season = anchors.season ?? {};
    const seasonLimits = limits.season;
    for (const key of BY_SEASON_KEYS) {
      const limit = seasonLimits ? toNumberLimit(seasonLimits[key]) : null;
      clampAnchor({
        baseAnchorGetter: () =&gt; previousAnchors.season?.[key] ?? anchors.season?.[key],
        currentAnchorGetter: () =&gt; anchors.season?.[key],
        anchorSetter: value =&gt; {
          anchors.season = anchors.season ?? {};
          if (anchors.season[key] !== value) {
            anchors.season[key] = value;
          }
        },
        limit,
        flagActive: Boolean(flags.bySeason[key]),
        logKey: `season.${key}`
      });
    }
  }
  if (changed) {
    anchor_limiter_logger.debug(funcName, "Đã áp dụng tính năng giới hạn điểm neo thời gian.");
  } else {
    anchor_limiter_logger.debug(funcName, "Tính năng giới hạn điểm neo thời gian không tạo ra thay đổi nào.");
  }
  return runtime;
}

const sync_logger = new Logger("GSKO-BASE/core/time-chat-mk-sync/sync");

function syncTimeChatMkAnchors({stat, runtime, mk}) {
  const funcName = "syncTimeChatMkAnchors";
  const currentMk = mk;
  sync_logger.debug(funcName, "Khởi động tiến trình đồng bộ", {
    mk: currentMk
  });
  if (!currentMk) {
    sync_logger.debug(funcName, "Thiếu tham số mk hợp lệ, bỏ qua bước đồng bộ.");
    return {
      stat,
      runtime,
      changeLog: []
    };
  }
  const {clock} = runtime;
  if (!clock) {
    sync_logger.warn(funcName, "runtime.clock không tồn tại, không thể đồng bộ điểm neo thời gian.");
    return {
      stat,
      runtime,
      changeLog: []
    };
  }
  const {flags} = clock;
  if (!flags) {
    sync_logger.debug(funcName, "runtime.clock.flags không tồn tại, bỏ qua đồng bộ.");
    return {
      stat,
      runtime,
      changeLog: []
    };
  }
  sync_logger.debug(funcName, "Các cờ thời gian hiện hành", {
    flags: external_default().cloneDeep(flags),
    now: external_default().cloneDeep(clock.now)
  });
  const cache = getCache(stat);
  const cacheSync = cache.timeChatMkSync ?? {};
  sync_logger.debug(funcName, "Đọc các điểm neo thời gian từ cache", cacheSync);
  const currentAnchors = TimeChatMkAnchorsSchema.parse(cacheSync.anchors ?? {});
  const nextAnchors = external_default().cloneDeep(currentAnchors);
  const changeLog = [];
  let changed = false;
  const appendAnchorChange = (pathSuffix, previousValue, reason) =&gt; {
    changeLog.push(createChangeLogEntry("time-chat-mk-sync", `cache.timeChatMkSync.anchors.${pathSuffix}`, previousValue ?? null, currentMk, reason));
    changed = true;
  };
  const ensureAnchor = key =&gt; {
    if (nextAnchors[key] == null) {
      appendAnchorChange(key, currentAnchors[key], `backfill ${key} anchor with current MK`);
      nextAnchors[key] = currentMk;
      sync_logger.debug(funcName, "Khuyết điểm neo, đã bổ sung giá trị mặc định", {
        key,
        mk: currentMk
      });
    }
  };
  const setAnchorWhenFlagged = (key, flag) =&gt; {
    if (flag &amp;&amp; nextAnchors[key] !== currentMk) {
      appendAnchorChange(key, currentAnchors[key], `flag ${key} triggered anchor update`);
      nextAnchors[key] = currentMk;
      sync_logger.debug(funcName, "Phát hiện bit cờ trạng thái -&gt; cập nhật điểm neo", {
        key,
        mk: currentMk
      });
    }
    ensureAnchor(key);
  };
  for (const key of CLOCK_ROOT_FLAG_KEYS) {
    setAnchorWhenFlagged(key, flags[key]);
  }
  if (flags.byPeriod) {
    const nextPeriodAnchors = nextAnchors.period = nextAnchors.period ?? {};
    for (const key of BY_PERIOD_KEYS) {
      if (flags.byPeriod[key] &amp;&amp; nextPeriodAnchors[key] !== currentMk) {
        appendAnchorChange(`period.${key}`, currentAnchors.period?.[key], `flag byPeriod.${key} triggered anchor update`);
        nextPeriodAnchors[key] = currentMk;
        sync_logger.debug(funcName, "Cờ khung giờ được kích hoạt -&gt; cập nhật điểm neo", {
          periodKey: key,
          mk: currentMk
        });
      }
    }
    const currentPeriodKey = BY_PERIOD_KEYS[clock.now?.periodIdx ?? -1];
    if (currentPeriodKey &amp;&amp; nextPeriodAnchors[currentPeriodKey] == null) {
      appendAnchorChange(`period.${currentPeriodKey}`, currentAnchors.period?.[currentPeriodKey], `backfill current period anchor ${currentPeriodKey} with current MK`);
      nextPeriodAnchors[currentPeriodKey] = currentMk;
      sync_logger.debug(funcName, "Khung giờ hiện tại khuyết điểm neo, bổ sung", {
        periodKey: currentPeriodKey,
        mk: currentMk
      });
    }
  }
  if (flags.bySeason) {
    const nextSeasonAnchors = nextAnchors.season = nextAnchors.season ?? {};
    for (const key of BY_SEASON_KEYS) {
      if (flags.bySeason[key] &amp;&amp; nextSeasonAnchors[key] !== currentMk) {
        appendAnchorChange(`season.${key}`, currentAnchors.season?.[key], `flag bySeason.${key} triggered anchor update`);
        nextSeasonAnchors[key] = currentMk;
        sync_logger.debug(funcName, "Cờ mùa được kích hoạt -&gt; cập nhật điểm neo", {
          seasonKey: key,
          mk: currentMk
        });
      }
    }
    const currentSeasonKey = BY_SEASON_KEYS[clock.now?.seasonIdx ?? -1];
    if (currentSeasonKey &amp;&amp; nextSeasonAnchors[currentSeasonKey] == null) {
      appendAnchorChange(`season.${currentSeasonKey}`, currentAnchors.season?.[currentSeasonKey], `backfill current season anchor ${currentSeasonKey} with current MK`);
      nextSeasonAnchors[currentSeasonKey] = currentMk;
      sync_logger.debug(funcName, "Mùa hiện tại bị khuyết điểm neo, bổ sung", {
        seasonKey: currentSeasonKey,
        mk: currentMk
      });
    }
  }
  clock.previousMkAnchors = external_default().cloneDeep(currentAnchors);
  clock.mkAnchors = nextAnchors;
  if (!changed) {
    sync_logger.debug(funcName, "Điểm neo chưa phát sinh thay đổi.", {
      previousAnchors: currentAnchors
    });
    return {
      stat,
      runtime,
      changeLog
    };
  }
  cache.timeChatMkSync = {
    ...cacheSync,
    anchors: nextAnchors
  };
  applyCacheToStat(stat, cache);
  sync_logger.debug(funcName, "Điểm neo thời gian đã đồng bộ xong.", {
    previousAnchors: currentAnchors,
    nextAnchors
  });
  return {
    stat,
    runtime,
    changeLog
  };
}

function processTimeChatMkSync({stat, runtime, mk, selectedMks}) {
  const syncResult = syncTimeChatMkAnchors({
    stat,
    runtime,
    mk
  });
  const finalRuntime = clampTimeChatMkAnchors({
    runtime: syncResult.runtime,
    stat: syncResult.stat,
    selectedMks: selectedMks ?? [],
    mk
  });
  return {
    stat: syncResult.stat,
    runtime: finalRuntime,
    changeLog: syncResult.changeLog
  };
}

function getTimeConfig(stat) {
  return stat.config.time;
}

function accessors_getTimeProgress(stat) {
  return stat.time.timeProgress;
}

function getClockAck(cache) {
  return cache.time?.clockAck;
}

function accessors_getClock(runtime) {
  return runtime.clock;
}

function writeTimeProcessorResult({runtime, cache, result}) {
  if (result.clock) {
    runtime.clock = result.clock;
  }
  if (!cache.time) {
    cache.time = {};
  }
  cache.time.clockAck = result.newClockAck ?? undefined;
}

const PAD2 = n =&gt; n < 10 ? "0" + n : "" + n;

const ymdID = d =&gt; d.getUTCFullYear() * 1e4 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();

const ymID = d =&gt; d.getUTCFullYear() * 100 + (d.getUTCMonth() + 1);

const weekStart = (d, weekStartsOn) =&gt; {
  const w = Number(weekStartsOn) &gt;= 0 &amp;&amp; Number(weekStartsOn) <= 6 ? Number(weekStartsOn) : 1;
  const dow = d.getUTCDay();
  const diff = (dow - w + 7) % 7;
  const x = new Date(d.getTime() - diff * 864e5);
  x.setUTCHours(0, 0, 0, 0);
  return x;
};

function periodIndexOf(mins) {
  if (mins < 300) return 7;
  if (mins < 420) return 0;
  if (mins < 690) return 1;
  if (mins < 780) return 2;
  if (mins < 1020) return 3;
  if (mins < 1140) return 4;
  if (mins < 1320) return 5;
  return 6;
}

function seasonIndexOf(m) {
  if (m &gt;= 3 &amp;&amp; m <= 5) return 0;
  if (m &gt;= 6 &amp;&amp; m <= 8) return 1;
  if (m &gt;= 9 &amp;&amp; m <= 11) return 2;
  return 3;
}

const time_processor_processor_logger = new Logger("GSKO-BASE/core/time-processor/processor");

function processTime({stat, prevClockAck}) {
  const funcName = "processTime";
  try {
    time_processor_processor_logger.debug(funcName, `Bắt đầu tính toán thời gian...`);
    const prev = prevClockAck;
    time_processor_processor_logger.debug(funcName, `Đọc bản ghi ACK của lượt trước từ Cache:`, prev);
    const timeConfig = getTimeConfig(stat);
    const {epochISO} = timeConfig;
    const tpMin = accessors_getTimeProgress(stat);
    time_processor_processor_logger.debug(funcName, `Cấu hình: epochISO=${epochISO}, timeProgress=${tpMin}min`);
    const weekStartsOn = 1;
    const epochMS = Date.parse(epochISO);
    if (Number.isNaN(epochMS)) {
      time_processor_processor_logger.warn(funcName, `Phân tích epochISO thất bại, sử dụng 1970-01-01Z làm mặc định; Giá trị cũ=${epochISO}`);
    }
    const baseMS = Number.isNaN(epochMS) ? 0 : epochMS;
    let tzMin = 0;
    const tzMatch = String(epochISO).match(/(?:([+-])(\d{2}):?(\d{2})|Z)$/);
    if (tzMatch &amp;&amp; tzMatch[0] !== "Z") {
      tzMin = (tzMatch[1] === "-" ? -1 : 1) * (parseInt(tzMatch[2], 10) * 60 + parseInt(tzMatch[3], 10));
    }
    const nowUTCms = baseMS + tpMin * 6e4;
    const local = new Date(nowUTCms + tzMin * 6e4);
    const year = local.getUTCFullYear();
    const month = local.getUTCMonth() + 1;
    const day = local.getUTCDate();
    const seasonIdx = seasonIndexOf(month);
    const seasonName = TIME_SEASON_NAMES[seasonIdx];
    const seasonID = year * 10 + seasonIdx;
    const ws = weekStart(local, weekStartsOn);
    const dayID = ymdID(local);
    const weekID = ymdID(ws);
    const monthID = ymID(local);
    const yearID = year;
    const weekdayIdx = (local.getUTCDay() - 1 + 7) % 7;
    const weekdayName = TIME_WEEK_NAMES[weekdayIdx] || `Tuần?(${weekdayIdx})`;
    const sign = tzMin &gt;= 0 ? "+" : "-";
    const offH = ("0" + Math.floor(Math.abs(tzMin) / 60)).slice(-2);
    const offM = ("0" + Math.abs(tzMin) % 60).slice(-2);
    const iso = `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(-2)}T` + `${("0" + local.getUTCHours()).slice(-2)}:${("0" + local.getUTCMinutes()).slice(-2)}:${("0" + local.getUTCSeconds()).slice(-2)}` + `${sign}${offH}:${offM}`;
    const minutesSinceMidnight = local.getUTCHours() * 60 + local.getUTCMinutes();
    const periodIdx = periodIndexOf(minutesSinceMidnight);
    const periodName = TIME_PERIOD_NAMES[periodIdx];
    const periodKey = TIME_PERIOD_KEYS[periodIdx];
    const periodID = dayID * 10 + periodIdx;
    time_processor_processor_logger.debug(funcName, `Kết quả tính: nowLocal=${iso}, dayID=${dayID}, weekID=${weekID}, monthID=${monthID}, yearID=${yearID}`);
    time_processor_processor_logger.debug(funcName, `Khung giờ: ${periodName} (idx=${periodIdx}, mins=${minutesSinceMidnight})`);
    time_processor_processor_logger.debug(funcName, `Mùa: ${seasonName} (idx=${seasonIdx})`);
    let newDay = false, newWeek = false, newMonth = false, newYear = false, newPeriod = false, newSeason = false;
    if (prev) {
      const d = prev.dayID !== dayID;
      const w = prev.weekID !== weekID;
      const m = prev.monthID !== monthID;
      const y = prev.yearID !== yearID;
      const s = prev.seasonID !== seasonID;
      const p = prev.periodID !== periodID;
      newYear = y;
      newSeason = newYear || s;
      newMonth = newSeason || m;
      newWeek = newMonth || w;
      newDay = newWeek || d;
      newPeriod = newDay || p;
      time_processor_processor_logger.debug(funcName, `So sánh: raw={d:${d},w:${w},m:${m},y:${y},s:${s},p:${p}} -&gt; cascade={day:${newDay},week:${newWeek},month:${newMonth},year:${newYear},season:${newSeason},period:${newPeriod}}`);
    } else {
      time_processor_processor_logger.debug(funcName, "Lần đầu tiên hoặc lượt trước không có ACK: Không kích hoạt bất kỳ new* nào (Tất cả bằng false)");
    }
    const newClockAck = {
      dayID,
      weekID,
      monthID,
      yearID,
      periodID,
      periodIdx,
      seasonID,
      seasonIdx
    };
    const now = {
      iso,
      year,
      month,
      day,
      weekdayIndex: weekdayIdx,
      weekdayName,
      periodName,
      periodIdx,
      minutesSinceMidnight,
      seasonName,
      seasonIdx,
      hour: Math.floor(minutesSinceMidnight / 60),
      minute: minutesSinceMidnight % 60,
      hm: PAD2(Math.floor(minutesSinceMidnight / 60)) + ":" + PAD2(minutesSinceMidnight % 60)
    };
    const byPeriod = {
      newDawn: false,
      newMorning: false,
      newNoon: false,
      newAfternoon: false,
      newDusk: false,
      newNight: false,
      newFirstHalfNight: false,
      newSecondHalfNight: false
    };
    if (newPeriod) {
      const keyToSet = BY_PERIOD_KEYS[periodIdx];
      if (keyToSet) {
        byPeriod[keyToSet] = true;
      }
    }
    const bySeason = {
      newSpring: false,
      newSummer: false,
      newAutumn: false,
      newWinter: false
    };
    if (newSeason) {
      const keyToSet = BY_SEASON_KEYS[seasonIdx];
      if (keyToSet) {
        bySeason[keyToSet] = true;
      }
    }
    const flags = {
      newPeriod,
      byPeriod,
      newDay,
      newWeek,
      newMonth,
      newSeason,
      bySeason,
      newYear
    };
    const result = {
      clock: {
        now,
        flags
      },
      newClockAck
    };
    time_processor_processor_logger.debug(funcName, "Xử lý dữ liệu thời gian hoàn tất, trả về dữ liệu chuẩn bị ghi vào runtime.");
    return result;
  } catch (err) {
    time_processor_processor_logger.error(funcName, "Chạy thất bại: " + (err?.message || String(err)), err);
    return {
      clock: {
        now: EMPTY_NOW,
        flags: EMPTY_FLAGS
      },
      newClockAck: null
    };
  }
}

const time_processor_logger = new Logger("GSKO-BASE/core/time-processor");

async function time_processor_processTime({stat, runtime}) {
  const funcName = "processTime";
  time_processor_logger.debug(funcName, "  ʼ    ʱ  ... (Bắt đầu quá trình xử lý thời gian)");
  try {
    const cache = getCache(stat);
    const prevClockAck = getClockAck(cache);
    const timeResult = processTime({
      stat,
      prevClockAck: prevClockAck ?? null
    });
    const changes = [];
    const normalizedNewClockAck = timeResult.newClockAck ?? undefined;
    const normalizedPrevClockAck = prevClockAck ?? undefined;
    const clockAckChanged = JSON.stringify(normalizedPrevClockAck ?? null) !== JSON.stringify(normalizedNewClockAck ?? null);
    if (clockAckChanged) {
      changes.push(createChangeLogEntry("time-processor", "cache.time.clockAck", normalizedPrevClockAck, normalizedNewClockAck, "Cập nhật clockAck cache của hệ thống xử lý thời gian"));
    }
    writeTimeProcessorResult({
      runtime,
      cache,
      result: timeResult
    });
    applyCacheToStat(stat, cache);
    time_processor_logger.debug(funcName, "ʱ 䴦    ϡ  (Quá trình xử lý thời gian đã xong)");
    return {
      stat,
      runtime,
      changes
    };
  } catch (e) {
    time_processor_logger.error(funcName, "    ʱ  ʱ           : (Phát sinh lỗi trong quá trình xử lý thời gian)", e);
    return {
      stat,
      runtime,
      changes: []
    };
  }
}

const FORECAST_RANGE_DAYS = 8;

const SEASON_CONDITION_POOL = {
  0: [ "clear", "partly_cloudy", "overcast", "light_rain", "storm" ],
  1: [ "clear", "partly_cloudy", "overcast", "light_rain", "heavy_rain", "storm" ],
  2: [ "clear", "partly_cloudy", "overcast", "light_rain", "fog" ],
  3: [ "clear", "overcast", "snow", "fog", "storm" ]
};

const CONDITION_DETAIL_MAP = {
  clear: {
    type: "clear",
    label: "Trời quang",
    description: "Bầu trời trong xanh, ánh nắng rực rỡ.",
    precipitationBias: .05,
    humidityBias: .35,
    windBias: 2,
    tempOffset: 2
  },
  partly_cloudy: {
    type: "partly_cloudy",
    label: "Nhiều mây",
    description: "Mây giăng khắp lối, thỉnh thoảng có ánh nắng xuyên qua.",
    precipitationBias: .2,
    humidityBias: .45,
    windBias: 3,
    tempOffset: 0
  },
  overcast: {
    type: "overcast",
    label: "Trời âm u",
    description: "Mây dày đặc bao phủ, ánh sáng mờ ảo.",
    precipitationBias: .35,
    humidityBias: .55,
    windBias: 3,
    tempOffset: -1
  },
  light_rain: {
    type: "light_rain",
    label: "Mưa nhỏ",
    description: "Mưa lất phất, không khí ẩm ướt.",
    precipitationBias: .65,
    humidityBias: .75,
    windBias: 4,
    tempOffset: -2
  },
  heavy_rain: {
    type: "heavy_rain",
    label: "Mưa to",
    description: "Mưa lớn mạnh mẽ, cần chú ý an toàn khi ra ngoài.",
    precipitationBias: .85,
    humidityBias: .85,
    windBias: 5,
    tempOffset: -3
  },
  storm: {
    type: "storm",
    label: "Bão sấm sét",
    description: "Sấm chớp giật đùng đùng, mưa to gió lớn.",
    precipitationBias: .95,
    humidityBias: .9,
    windBias: 6,
    tempOffset: -3
  },
  snow: {
    type: "snow",
    label: "Có tuyết",
    description: "Tuyết rơi phủ kín mặt đất, thời tiết lạnh giá.",
    precipitationBias: .7,
    humidityBias: .8,
    windBias: 4,
    tempOffset: -4
  },
  fog: {
    type: "fog",
    label: "Sương mù",
    description: "Sương mù giăng lối, tầm nhìn bị hạn chế.",
    precipitationBias: .25,
    humidityBias: .9,
    windBias: 2,
    tempOffset: -1
  }
};

const SEASON_TEMPERATURE_PRESET = [ {
  min: 5,
  max: 20
}, {
  min: 22,
  max: 35
}, {
  min: 10,
  max: 24
}, {
  min: -5,
  max: 8
} ];

function buildWeatherRuntime({clock, current}) {
  if (!clock?.now) {
    return current;
  }
  const baseDate = getAnchorDate(clock);
  if (!baseDate) {
    return current;
  }
  const anchorIso = formatDate(baseDate);
  const newDayFlag = Boolean(clock.flags?.newDay);
  const needsRefresh = !current || current.anchorDayISO !== anchorIso;
  if (!needsRefresh &amp;&amp; !newDayFlag) {
    return current;
  }
  const days = [];
  for (let offset = 0; offset < FORECAST_RANGE_DAYS; offset += 1) {
    days.push(buildWeatherDay(baseDate, offset));
  }
  return {
    generatedAtISO: (new Date).toISOString(),
    anchorDayISO: anchorIso,
    days
  };
}

function buildWeatherDay(baseDate, offsetDays) {
  const targetDate = addDays(baseDate, offsetDays);
  const year = targetDate.getUTCFullYear();
  const month = targetDate.getUTCMonth() + 1;
  const day = targetDate.getUTCDate();
  const weekdayIndex = (targetDate.getUTCDay() - 1 + 7) % 7;
  const weekdayName = TIME_WEEK_NAMES[weekdayIndex] ?? TIME_WEEK_NAMES[0];
  const seasonIndex = seasonIndexOf(month);
  const seedBase = year * 1e4 + month * 100 + day;
  const conditionType = pickConditionType(seedBase, seasonIndex);
  const condition = CONDITION_DETAIL_MAP[conditionType];
  const temperature = calculateTemperature(seedBase, seasonIndex, condition.tempOffset);
  const precipitationChance = calculateProbability(seedBase + 17, condition.precipitationBias);
  const humidity = calculateProbability(seedBase + 23, condition.humidityBias, .1);
  const windLevel = calculateWindLevel(seedBase + 31, condition.windBias);
  const narrative = buildNarrative({
    weekdayName,
    conditionLabel: condition.label,
    temperature,
    precipitationChance,
    windLevel
  });
  return {
    condition: {
      type: condition.type,
      label: condition.label,
      description: condition.description
    },
    temperature,
    precipitationChance,
    humidity,
    windLevel,
    narrative
  };
}

function getAnchorDate(clock) {
  const {year, month, day} = clock.now;
  if (!year || !month || !day) {
    return null;
  }
  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date, offset) {
  return new Date(date.getTime() + offset * 864e5);
}

function formatDate(date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

function pad(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

function pickConditionType(seed, seasonIdx) {
  const pool = SEASON_CONDITION_POOL[seasonIdx] ?? WEATHER_CONDITION_TYPES;
  const value = pseudoRandom(seed);
  const index = Math.floor(value * pool.length) % pool.length;
  return pool[index];
}

function calculateTemperature(seed, seasonIdx, offset) {
  const preset = SEASON_TEMPERATURE_PRESET[seasonIdx] ?? {
    min: 8,
    max: 20
  };
  const variance = 6;
  const min = Math.round(preset.min + offset + (pseudoRandom(seed) - .5) * variance);
  const rawMax = Math.round(preset.max + offset + (pseudoRandom(seed + 7) - .5) * variance);
  const max = Math.max(rawMax, min + 2);
  return {
    minC: min,
    maxC: max
  };
}

function calculateProbability(seed, bias, spread = .2) {
  const value = bias + (pseudoRandom(seed) - .5) * spread * 2;
  return clamp(value, 0, 1);
}

function calculateWindLevel(seed, bias) {
  const value = bias + Math.round((pseudoRandom(seed) - .5) * 4);
  return Math.max(1, Math.min(12, value));
}

function buildNarrative({weekdayName, conditionLabel, temperature, precipitationChance, windLevel}) {
  const precipText = precipitationChance &gt; .6 ? "Tỷ lệ lượng mưa cao" : precipitationChance < .2 ? "Hầu như không có lượng mưa" : "Có khả năng mưa rải rác";
  return `${weekdayName} ${conditionLabel}，Cao nhất ${temperature.maxC}C / Thấp nhất ${temperature.minC}C，${precipText}，Cấp gió là ${windLevel}.`;
}

function pseudoRandom(seed) {
  const x = Math.sin(seed) * 1e4;
  return x - Math.floor(x);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const weather_processor_logger = new Logger("GSKO-BASE/core/weather-processor");

function processWeather({stat, runtime}) {
  const funcName = "processWeather";
  weather_processor_logger.debug(funcName, "Bắt đầu tính toán dữ liệu dự báo thời tiết...");
  try {
    void stat;
    const weather = buildWeatherRuntime({
      clock: runtime.clock,
      current: runtime.weather
    });
    if (weather) {
      runtime.weather = weather;
    }
    weather_processor_logger.debug(funcName, "Xử lý thời tiết thành công.");
    return {
      runtime
    };
  } catch (err) {
    weather_processor_logger.error(funcName, "Xử lý thời tiết bị lỗi:", err);
    return {
      runtime
    };
  }
}

const io_logger = new Logger("IOModule");

async function writeChangesToEra({changes, stat}) {
  const funcName = "writeChangesToEra";
  io_logger.debug(funcName, `Bắt đầu ghi ${changes.length} thay đổi vào trong biến ERA...`, {
    stat
  });
  if (!changes || changes.length === 0) {
    io_logger.debug(funcName, "Bản ghi lưu thay đổi trống, không cần ghi đè.");
    return;
  }
  for (const entry of changes) {
    if (external_default().has(stat, entry.path)) {
      eventEmit("era:updateByPath", {
        path: entry.path,
        value: entry.newValue
      });
    } else {
      eventEmit("era:insertByPath", {
        path: entry.path,
        value: entry.newValue
      });
    }
  }
  io_logger.debug(funcName, "Mọi thay đổi đã được gửi lên hệ thống ERA.");
}

const aya_news_processor_processor_logger = new Logger("GSKO-BASE/subsidiary/aya-news-processor/processor");

const AYA_ID = "aya";

function processAyaNews(runtime) {
  const funcName = "processAyaNews";
  aya_news_processor_processor_logger.debug(funcName, "Bắt đầu xử lý tin tức của Aya...", {
    runtime: (0, external_namespaceObject.cloneDeep)(runtime)
  });
  const {snapshots, clock} = runtime;
  if (!snapshots || snapshots.length === 0 || !clock?.mkAnchors) {
    aya_news_processor_processor_logger.warn(funcName, "Bị khuyết dữ liệu thiết yếu (snapshots hoặc clock.mkAnchors), trả kết quả về sớm.");
    return runtime;
  }
  const startMk = clock.mkAnchors.newDay;
  if (!startMk) {
    aya_news_processor_processor_logger.debug(funcName, "Trong clock.mkAnchors không thể tìm thấy newDay, không cần xử lý, trả kết quả về sớm.");
    return runtime;
  }
  aya_news_processor_processor_logger.debug(funcName, `Đã tìm thấy startMk của newDay: ${startMk}`);
  const startIndex = snapshots.findIndex(s =&gt; s.mk === startMk);
  if (startIndex === -1) {
    aya_news_processor_processor_logger.warn(funcName, `Trong snapshots không tìm thấy snapshot tương ứng với startMk "${startMk}", trả kết quả về sớm.`);
    return runtime;
  }
  const relevantSnapshots = snapshots.slice(startIndex);
  aya_news_processor_processor_logger.debug(funcName, `Đã tìm thấy chỉ mục khởi đầu ${startIndex}，sẽ tiến hành xử lý ${relevantSnapshots.length} snapshot có liên quan.`);
  const newsEntries = [];
  for (const snapshot of relevantSnapshots) {
    aya_news_processor_processor_logger.debug(funcName, `Xử lý snapshot (mk: ${snapshot.mk})`);
    const stat = snapshot.statWithoutMeta;
    const cache = stat.cache;
    if (!stat?.chars || !cache?.time?.clockAck) {
      aya_news_processor_processor_logger.debug(funcName, `Snapshot (mk: ${snapshot.mk}) bị thiếu stat.chars hoặc cache.time.clockAck, bỏ qua.`);
      continue;
    }
    let ayaCharData;
    let ayaCharId;
    for (const charId in stat.chars) {
      if (Object.prototype.hasOwnProperty.call(stat.chars, charId)) {
        const charData = stat.chars[charId];
        if (charId === AYA_ID) {
          ayaCharData = charData;
          ayaCharId = charId;
          aya_news_processor_processor_logger.debug(funcName, `Đã tìm thấy Shameimaru Aya (ID: ${AYA_ID}) bên trong snapshot, tên nhân vật là: ${ayaCharId}`);
          break;
        }
      }
    }
    if (!ayaCharData) {
      aya_news_processor_processor_logger.debug(funcName, `Bên trong snapshot hiện tại (mk: ${snapshot.mk}) không tìm thấy Shameimaru Aya (ID: ${AYA_ID}), bỏ qua.`);
      continue;
    }
    const ayaLocation = ayaCharData["Khu Vực Hiện Tại"];
    const ayaTarget = ayaCharData["Mục Tiêu"];
    const {time} = cache;
    const {clockAck} = time;
    if (!ayaLocation || !ayaTarget) {
      aya_news_processor_processor_logger.debug(funcName, `Dữ liệu về Shameimaru Aya chưa đầy đủ (thiếu Khu Vực Hiện Tại hoặc Mục Tiêu), bỏ qua.`, {
        ayaCharData
      });
      continue;
    }
    const otherCharactersInfo = [];
    aya_news_processor_processor_logger.debug(funcName, `Vị trí hiện hành của Aya: ${ayaLocation}。Bắt đầu quá trình tìm kiếm các nhân vật khác trong cùng khu vực.`);
    for (const charId in stat.chars) {
      if (charId === ayaCharId) continue;
      if (Object.prototype.hasOwnProperty.call(stat.chars, charId)) {
        const otherCharData = stat.chars[charId];
        if (otherCharData["Khu Vực Hiện Tại"] === ayaLocation) {
          let doing = "đang làm chuyện kỳ lạ";
          if (otherCharData["Mục Tiêu"]) {
            doing = "đang " + otherCharData["Mục Tiêu"];
          }
          const otherInfo = {
            id: charId,
            name: otherCharData.name,
            target: doing
          };
          otherCharactersInfo.push(otherInfo);
          aya_news_processor_processor_logger.debug(funcName, `Tìm thấy nhân vật cùng khu vực: ${charId}`, {
            otherInfo
          });
        }
      }
    }
    const newEntry = {
      location: ayaLocation,
      otherCharacters: otherCharactersInfo,
      target: ayaTarget,
      clockAck
    };
    newsEntries.push(newEntry);
    aya_news_processor_processor_logger.debug(funcName, "Tạo một mục tin tức mới.", {
      newEntry: (0, external_namespaceObject.cloneDeep)(newEntry)
    });
  }
  runtime.ayaNews = {
    entries: newsEntries
  };
  aya_news_processor_processor_logger.debug(funcName, "Hoàn tất xử lý tin tức của Aya.", {
    ayaNews: (0, external_namespaceObject.cloneDeep)(runtime.ayaNews)
  });
  return runtime;
}

function ayaNewsProcessor(runtime) {
  if (runtime.clock?.flags?.newDay) {
    return processAyaNews(runtime);
  }
  return runtime;
}

const show_ui_relay_logger = new Logger("GSKO-BASE/subsidiary/show-ui-relay");

const SELF_DISPATCH_FLAG = true;

let cachedArgs = null;

let isReplaying = false;

function isSelfDispatched(args) {
  if (args.length === 0) return false;
  const maybeFlag = args[args.length - 1];
  return typeof maybeFlag === "boolean" &amp;&amp; maybeFlag === SELF_DISPATCH_FLAG;
}

eventOn("GSKO:showUI", (...args) =&gt; {
  const funcName = "onShowUI";
  if (isSelfDispatched(args)) {
    if (isReplaying) {
      show_ui_relay_logger.debug(funcName, "Đã phát hiện sự kiện chuyển tiếp bởi chính bản thân nó, bỏ qua để đề phòng trường hợp xảy ra vòng lặp.");
      isReplaying = false;
    } else {
      show_ui_relay_logger.debug(funcName, "Phát hiện sự kiện có cờ chuyển tiếp, đã bỏ qua.");
    }
    return;
  }
  cachedArgs = [ ...args ];
  show_ui_relay_logger.debug(funcName, "Các thông số GSKO:showUI mới nhất đã được lưu lại trong cache.", cachedArgs);
});

eventOn("GSKO:requireData", () =&gt; {
  const funcName = "onRequireData";
  if (!cachedArgs) {
    show_ui_relay_logger.debug(funcName, "Nhận được GSKO:requireData nhưng chưa lưu bất kỳ dữ liệu nào trong cache, bỏ qua.");
    return;
  }
  show_ui_relay_logger.debug(funcName, "Đã nhận GSKO:requireData, chuẩn bị phát lại (replay) dữ liệu UI lưu trong cache.");
  isReplaying = true;
  const dispatchResult = eventEmit("GSKO:showUI", ...cachedArgs, SELF_DISPATCH_FLAG);
  Promise.resolve(dispatchResult).catch(error =&gt; {
    show_ui_relay_logger.error(funcName, "eventEmit bị lỗi khi phát lại (replay) dữ liệu trong cache.", error);
  }).finally(() =&gt; {
    if (isReplaying) {
      isReplaying = false;
    }
  });
});

const UiConfigSchema = external_z_namespaceObject.z.object({
  theme: external_z_namespaceObject.z.enum([ "light", "dark" ]).default("light"),
  mainFontPercent: external_z_namespaceObject.z.number().default(100),
  fontScaleStepPct: external_z_namespaceObject.z.number().default(10)
}).passthrough();

const IncidentPoolItemSchema = external_z_namespaceObject.z.object({
  name: external_z_namespaceObject.z.string(),
  detail: external_z_namespaceObject.z.string(),
  mainLoc: external_z_namespaceObject.z.union([ external_z_namespaceObject.z.string(), external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()) ])
});

const IncidentConfigSchema = external_z_namespaceObject.z.object({
  cooldownMinutes: external_z_namespaceObject.z.number(),
  forceTrigger: external_z_namespaceObject.z.boolean(),
  isRandomPool: external_z_namespaceObject.z.boolean(),
  pool: external_z_namespaceObject.z.array(PreprocessStringifiedObject(IncidentPoolItemSchema)).optional(),
  randomCore: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()).optional(),
  randomType: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()).optional()
});

const FlagHistoryLimitSchema = external_z_namespaceObject.z.number().int().min(0);

const PeriodFlagHistoryLimitSchema = external_z_namespaceObject.z.object({
  newDawn: FlagHistoryLimitSchema,
  newMorning: FlagHistoryLimitSchema,
  newNoon: FlagHistoryLimitSchema,
  newAfternoon: FlagHistoryLimitSchema,
  newDusk: FlagHistoryLimitSchema,
  newNight: FlagHistoryLimitSchema,
  newFirstHalfNight: FlagHistoryLimitSchema,
  newSecondHalfNight: FlagHistoryLimitSchema
}).partial().default({});

const SeasonFlagHistoryLimitSchema = external_z_namespaceObject.z.object({
  newSpring: FlagHistoryLimitSchema,
  newSummer: FlagHistoryLimitSchema,
  newAutumn: FlagHistoryLimitSchema,
  newWinter: FlagHistoryLimitSchema
}).partial().default({});

const TimeFlagHistoryLimitsSchema = external_z_namespaceObject.z.object({
  newPeriod: FlagHistoryLimitSchema.optional(),
  newDay: FlagHistoryLimitSchema.optional(),
  newWeek: FlagHistoryLimitSchema.optional(),
  newMonth: FlagHistoryLimitSchema.optional(),
  newSeason: FlagHistoryLimitSchema.optional(),
  newYear: FlagHistoryLimitSchema.optional(),
  period: PeriodFlagHistoryLimitSchema.optional(),
  season: SeasonFlagHistoryLimitSchema.optional()
}).default({});

const TimeConfigSchema = external_z_namespaceObject.z.object({
  epochISO: external_z_namespaceObject.z.string().datetime({
    message: "Định dạng ngày giờ ISO 8601 không hợp lệ"
  }),
  flagHistoryLimits: TimeFlagHistoryLimitsSchema
}).passthrough();

const DEFAULT_TIME_CONFIG = {
  epochISO: "2025-10-24T06:00:00+09:00",
  flagHistoryLimits: {}
};

const AffectionConfigSchema = external_z_namespaceObject.z.object({
  affectionStages: external_z_namespaceObject.z.array(PreprocessStringifiedObject(AffectionStageWithForgetSchema)),
  loveThreshold: external_z_namespaceObject.z.number().optional(),
  hateThreshold: external_z_namespaceObject.z.number().optional()
});

const ConfigSchema = external_z_namespaceObject.z.object({
  affection: AffectionConfigSchema.optional(),
  specials: EntryListPreprocessSchema.default([]),
  routine: EntryListPreprocessSchema.default([]),
  time: TimeConfigSchema.default(DEFAULT_TIME_CONFIG),
  incident: IncidentConfigSchema.optional(),
  ui: UiConfigSchema,
  mainBodyTags: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()).optional(),
  excludeBodyTags: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()).optional()
}).passthrough();

const FestivalDefinitionSchema = external_z_namespaceObject.z.object({
  month: external_z_namespaceObject.z.number(),
  start_day: external_z_namespaceObject.z.number(),
  end_day: external_z_namespaceObject.z.number(),
  name: external_z_namespaceObject.z.string(),
  type: external_z_namespaceObject.z.string(),
  customs: external_z_namespaceObject.z.array(external_z_namespaceObject.z.string()),
  importance: external_z_namespaceObject.z.number(),
  host: external_z_namespaceObject.z.string()
});

const festival_FestivalSchema = FestivalDefinitionSchema.extend({
  id: external_z_namespaceObject.z.string().optional()
});

const FestivalsListSchema = external_z_namespaceObject.z.record(external_z_namespaceObject.z.string(), PreprocessStringifiedObject(FestivalDefinitionSchema)).default({});

const StatSchema = external_z_namespaceObject.z.object({
  config: ConfigSchema,
  chars: CharsSchema,
  user: UserSchema,
  world: WorldSchema.optional(),
  time: timeSchema,
  cache: CacheSchema.optional(),
  incidents: IncidentsSchema.default({}),
  festivals_list: FestivalsListSchema,
  "Chính văn bổ sung": external_z_namespaceObject.z.string().optional(),
  weather: external_z_namespaceObject.z.string().optional(),
  AyaNews: external_z_namespaceObject.z.string().optional()
});

const TAG_REGEX = /\[\[(.*?)\]\]/;

const world_book_config_processor_processor_logger = new Logger("GSKO-BASE/subsidiary/world-book-config-processor/processor");

async function processWorldBookConfigs({stat}) {
  const funcName = "processWorldBookConfigs";
  const charWorldbooks = getCharWorldbookNames("current");
  const primaryWorldbookName = charWorldbooks.primary;
  if (!primaryWorldbookName) {
    world_book_config_processor_processor_logger.log(funcName, "Nhân vật hiện tại chưa được thiết lập Sách thế giới (Worldbook) chính, bỏ qua việc phân tích cấu hình.");
    return stat;
  }
  try {
    const worldBookEntries = await getWorldbook(primaryWorldbookName);
    const taggedEntries = worldBookEntries.filter(entry =&gt; TAG_REGEX.test(entry.name));
    const sortedEntries = external_default().sortBy(taggedEntries, entry =&gt; entry.position.order);
    const configsByTag = sortedEntries.reduce((acc, entry) =&gt; {
      const match = entry.name.match(TAG_REGEX);
      if (!match) return acc;
      const tagName = match[1];
      try {
        const content = JSON.parse(entry.content);
        if (!acc[tagName]) {
          acc[tagName] = {};
        }
        external_default().merge(acc[tagName], content);
      } catch (error) {
        world_book_config_processor_processor_logger.error(funcName, `Phân tích nội dung JSON của thẻ "${entry.name}" thất bại.`, error);
      }
      return acc;
    }, {});
    let finalStat = external_default().cloneDeep(stat);
    let mergedCount = 0;
    for (const [tagName, configContent] of Object.entries(configsByTag)) {
      const tempStat = external_default().cloneDeep(finalStat);
      external_default().defaultsDeep(tempStat, {
        [tagName]: configContent
      });
      const parseResult = StatSchema.safeParse(tempStat);
      if (parseResult.success) {
        finalStat = parseResult.data;
        world_book_config_processor_processor_logger.log(funcName, `Cấu hình của nhãn [${tagName}] đã được gộp và xác thực thành công.`);
        mergedCount++;
      } else {
        world_book_config_processor_processor_logger.warn(funcName, `Cấu hình của nhãn [${tagName}] sau khi gộp đã thất bại ở bước xác thực, bỏ qua mục này. Chi tiết lỗi ở bên dưới:`);
        parseResult.error.issues.forEach(issue =&gt; {
          const path = issue.path.join(".");
          world_book_config_processor_processor_logger.warn(`${funcName}-Validation`, `Đường dẫn "${path}": ${issue.message}`);
        });
      }
    }
    if (mergedCount &gt; 0) {
      world_book_config_processor_processor_logger.log(funcName, `Tổng cộng ${mergedCount} cấu hình của các nhãn đã được gộp thành công vào trong đối tượng stat.`);
    } else {
      world_book_config_processor_processor_logger.log(funcName, "Không gộp thành công bất kỳ cấu hình nào từ Sách thế giới (Worldbook).");
    }
    return finalStat;
  } catch (error) {
    if (error instanceof Error) {
      world_book_config_processor_processor_logger.error(funcName, `Lấy dữ liệu hoặc xử lý Sách thế giới "${primaryWorldbookName}" thất bại:`, error.message);
    } else {
      world_book_config_processor_processor_logger.error(funcName, `Phát sinh lỗi bất ngờ trong quá trình xử lý Sách thế giới "${primaryWorldbookName}".`);
    }
    return stat;
  }
}

function worldBookConfigProcessor({stat}) {
  return processWorldBookConfigs({
    stat
  });
}

function onWriteDone(listener, options = {}) {
  const {ignoreApiWrite = false} = options;
  const wrappedListener = payload =&gt; {
    if (ignoreApiWrite &amp;&amp; payload.actions.apiWrite) {
      return;
    }
    listener(payload);
  };
  eventOn(constants_ERA_BROADCAST_EVENT_NAMES.WRITE_DONE, wrappedListener);
  return () =&gt; {
    eventRemoveListener(constants_ERA_BROADCAST_EVENT_NAMES.WRITE_DONE, wrappedListener);
  };
}

function onQueryResult(listener) {
  eventOn(ERA_BROADCAST_EVENT_NAMES.QUERY_RESULT, listener);
  return () =&gt; {
    eventRemoveListener(ERA_BROADCAST_EVENT_NAMES.QUERY_RESULT, listener);
  };
}

const prompt_injection_logger = new Logger("GSKO-BASE/utils/prompt-injection");

const PROMPT_INJECTION_ID = "gsk_base_prompt_injection";

function refreshInjectedPrompt(prompt) {
  if (!prompt.trim()) {
    prompt_injection_logger.warn("refreshInjectedPrompt", "prompt trống, bỏ qua việc tiêm vào.");
    return;
  }
  try {
    if (typeof uninjectPrompts === "function") {
      uninjectPrompts([ PROMPT_INJECTION_ID ]);
    }
    if (typeof injectPrompts === "function") {
      injectPrompts([ {
        id: PROMPT_INJECTION_ID,
        position: "in_chat",
        depth: 0,
        role: "user",
        content: prompt,
        should_scan: false
      } ]);
    } else {
      prompt_injection_logger.warn("refreshInjectedPrompt", "injectPrompts không khả dụng, bỏ qua việc tiêm prompt.");
    }
  } catch (err) {
    prompt_injection_logger.error("refreshInjectedPrompt", "Tiêm prompt thất bại:" + (err?.message || String(err)), err);
  }
}

const GSKO_BASE_logger = new Logger("GSKO-BASE");

function logState(moduleName, modified, {stat, runtime, cache}) {
  const title = `[${moduleName}] (Sửa đổi: ${modified})`;
  const data = {
    Stat: external_default().cloneDeep(stat),
    Runtime: external_default().cloneDeep(runtime),
    Cache: external_default().cloneDeep(cache)
  };
  GSKO_BASE_logger.log("logState", title, data);
}

$(() =&gt; {
  GSKO_BASE_logger.log("main", "Script xử lý dữ liệu nền đã được tải");
  const handleWriteDone = async (payload, isFakeEvent = false) =&gt; {
    const {statWithoutMeta, mk, editLogs, selectedMks} = payload;
    GSKO_BASE_logger.log("handleWriteDone", "Đã nhận dữ liệu stat gốc", statWithoutMeta);
    const latestMessages = getChatMessages(-1);
    if (!latestMessages || latestMessages.length === 0) {
      GSKO_BASE_logger.error("handleWriteDone", "Không thể lấy được tin nhắn trò chuyện mới nhất, hủy bỏ thực thi.");
      return;
    }
    const latestMessage = latestMessages[0];
    const message_id = latestMessage.message_id;
    GSKO_BASE_logger.log("handleWriteDone", `Sử dụng ID tin nhắn mới nhất: ${message_id}`);
    const parseResult = StatSchema.safeParse(statWithoutMeta);
    if (!parseResult.success) {
      GSKO_BASE_logger.error("handleWriteDone", "Xác thực cấu trúc dữ liệu Stat thất bại. Dưới đây là lỗi chi tiết:");
      parseResult.error.issues.forEach(issue =&gt; {
        const path = issue.path.join(".");
        const receivedValue = external_default().get(statWithoutMeta, issue.path);
        GSKO_BASE_logger.error("Stat-Validation", `Đường dẫn "${path}": ${issue.message}. (Giá trị nhận được: ${JSON.stringify(receivedValue, null, 2)})`);
      });
      GSKO_BASE_logger.error("handleWriteDone", "Dữ liệu Stat gốc hoàn chỉnh:", statWithoutMeta);
      return;
    }
    try {
      let currentStat = parseResult.data;
      const initialStat = external_default().cloneDeep(currentStat);
      let currentRuntime = getRuntimeObject();
      logState("Trạng thái khởi tạo", "Không", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      currentStat = await worldBookConfigProcessor({
        stat: currentStat
      });
      logState("WorldBook Config Processor", "stat", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const currentEditLog = editLogs?.[mk];
      const areaResult = await processArea({
        stat: currentStat,
        runtime: currentRuntime
      });
      currentRuntime = areaResult.runtime;
      logState("Area Processor", "runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const normalizationResult = normalizeLocationData({
        originalStat: currentStat,
        runtime: currentRuntime
      });
      currentStat = normalizationResult.stat;
      const normalizationChanges = normalizationResult.changeLog;
      logState("Normalizer Processor", "stat", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const locResult = processCharacterLocations({
        stat: currentStat,
        runtime: currentRuntime
      });
      currentRuntime = locResult.runtime;
      logState("Character Locations Processor", "runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      currentRuntime = process({
        runtime: currentRuntime,
        stat: currentStat
      });
      logState("Character Settings Processor", "runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const affectionResult = processAffectionDecisions({
        stat: currentStat,
        editLog: currentEditLog,
        runtime: currentRuntime
      });
      currentStat = affectionResult.stat;
      const affectionChanges = affectionResult.changes;
      logState("Affection Processor", "stat", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const timeResult = await time_processor_processTime({
        stat: currentStat,
        runtime: currentRuntime
      });
      currentStat = timeResult.stat;
      currentRuntime = timeResult.runtime;
      const timeChanges = timeResult.changes;
      logState("Time Processor", "stat (cache), runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const weatherResult = processWeather({
        stat: currentStat,
        runtime: currentRuntime
      });
      currentRuntime = weatherResult.runtime;
      logState("Weather Processor", "runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const mkSyncResult = processTimeChatMkSync({
        stat: currentStat,
        runtime: currentRuntime,
        mk,
        selectedMks
      });
      currentStat = mkSyncResult.stat;
      currentRuntime = mkSyncResult.runtime;
      const mkSyncChanges = mkSyncResult.changeLog;
      logState("Time Chat MK Sync", "stat (cache), runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      currentRuntime = await fetchSnapshotsForTimeFlags({
        runtime: currentRuntime,
        mk,
        isFake: isFakeEvent
      });
      logState("Snapshot Fetcher", "runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const forgettingResult = await processAffectionForgetting({
        stat: currentStat,
        runtime: currentRuntime,
        mk,
        selectedMks,
        currentMessageId: message_id
      });
      currentStat = forgettingResult.stat;
      currentRuntime = forgettingResult.runtime;
      const forgettingChanges = forgettingResult.changes;
      logState("Affection Forgetting Processor", "stat", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const incidentResult = await processIncidentDecisions({
        runtime: currentRuntime,
        stat: currentStat
      });
      currentStat = incidentResult.stat;
      currentRuntime = incidentResult.runtime;
      const incidentChanges = incidentResult.changes;
      logState("Incident Processor", "stat (cache), runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const festivalResult = await festival_processor_processFestival({
        stat: currentStat,
        runtime: currentRuntime
      });
      currentRuntime = festivalResult.runtime;
      logState("Festival Processor", "runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const charResult = await processCharacterDecisions({
        stat: currentStat,
        runtime: currentRuntime
      });
      currentStat = charResult.stat;
      currentRuntime = charResult.runtime;
      const charChanges = charResult.changes;
      logState("Character Processor", "stat (cache), runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      currentRuntime = processCharacterLog(currentRuntime);
      logState("Character Log Processor", "runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      currentRuntime = ayaNewsProcessor(currentRuntime);
      logState("Aya News Processor", "runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      currentRuntime = await mentionedCharacterProcessor({
        runtime: currentRuntime,
        stat: currentStat
      });
      logState("Mentioned Character Processor", "runtime", {
        stat: currentStat,
        runtime: currentRuntime,
        cache: getCache(currentStat)
      });
      const prompt = buildPrompt({
        runtime: currentRuntime,
        stat: currentStat
      });
      refreshInjectedPrompt(prompt);
      GSKO_BASE_logger.log("handleWriteDone", "Xây dựng prompt hoàn tất:", prompt);
      const allChanges = normalizationChanges.concat(affectionChanges).concat(timeChanges).concat(mkSyncChanges).concat(forgettingChanges).concat(incidentChanges).concat(charChanges);
      if (payload?.actions?.swipedRollback !== true) {
        await writeChangesToEra({
          changes: allChanges,
          stat: initialStat
        });
      } else {
        GSKO_BASE_logger.log("handleWriteDone", "Phát hiện swipedRollback, bỏ qua writeChangesToEra.");
      }
      await sendData({
        stat: currentStat,
        runtime: currentRuntime,
        eraPayload: payload,
        changes: allChanges
      });
      GSKO_BASE_logger.log("handleWriteDone", "Đã xử lý xong tất cả các module cốt lõi.", {
        finalRuntime: currentRuntime
      });
    } catch (error) {
      GSKO_BASE_logger.error("handleWriteDone", "Xảy ra lỗi chưa được bắt trong luồng xử lý chính:", error);
      if (error instanceof Error) {
        GSKO_BASE_logger.error("handleWriteDone", "Stack trace lỗi (Ngăn xếp lỗi):", error.stack);
      }
    }
  };
  onWriteDone(detail =&gt; {
    GSKO_BASE_logger.log("main", "Đã nhận sự kiện era:writeDone", detail);
    if (detail?.actions?.apiWrite === true) {
      GSKO_BASE_logger.log("onWriteDone", "Phát hiện sự kiện có cờ apiWrite, bỏ qua logic làm mới");
      return;
    }
    handleWriteDone(detail, false).catch(error =&gt; {
      GSKO_BASE_logger.error("onWriteDone", "handleWriteDone xảy ra từ chối Promise (Promise rejection) chưa được xử lý:", error);
    });
  }, {
    ignoreApiWrite: true
  });
  eventOn("dev:fakeWriteDone", detail =&gt; {
    GSKO_BASE_logger.log("main", "Đã nhận sự kiện dev:fakeWriteDone giả mạo");
    handleWriteDone(detail, true).catch(error =&gt; {
      GSKO_BASE_logger.error("dev:fakeWriteDone", "handleWriteDone xảy ra từ chối Promise (Promise rejection) chưa được xử lý:", error);
    });
  });
  $(window).on("pagehide.main", () =&gt; {
    GSKO_BASE_logger.log("main", "Script xử lý dữ liệu nền đã được gỡ tải");
    $(window).off(".main");
  });
});
