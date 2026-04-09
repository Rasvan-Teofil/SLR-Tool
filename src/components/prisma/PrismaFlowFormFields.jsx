const inputClass =
  "mt-0.5 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800 outline-none focus:border-indigo-400";

const labelClass = "block text-xs font-medium text-slate-600";

const toggleClass =
  "flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 hover:bg-slate-50";

export default function PrismaFlowFormFields({ flow, onChangeConfig, onChangeCount }) {
  const { config, counts } = flow;

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Diagram options</p>
        <div className="flex flex-wrap gap-2">
          {[
            ["previous", "Previous studies"],
            ["other", "Other sources"],
            ["regDetail", "Registers (separate line)"],
            ["dbDetail", "Per-database note (under Databases in diagram)"],
            ["metaAnalysis", "Show qualitative synthesis & meta-analysis branch"],
          ].map(([key, label]) => (
            <label key={key} className={toggleClass}>
              <input
                type="checkbox"
                className="rounded border-slate-400 text-indigo-600 focus:ring-indigo-400"
                checked={!!config[key]}
                onChange={(e) => onChangeConfig({ [key]: e.target.checked })}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Counts</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={labelClass}>Records from databases</label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              value={counts.identificationDatabases}
              onChange={(e) => onChangeCount({ identificationDatabases: e.target.value })}
              placeholder="n"
            />
          </div>
          {config.regDetail ? (
            <div>
              <label className={labelClass}>Registers</label>
              <input
                type="text"
                inputMode="numeric"
                className={inputClass}
                value={counts.identificationRegisters}
                onChange={(e) => onChangeCount({ identificationRegisters: e.target.value })}
                placeholder="n"
              />
            </div>
          ) : null}
          {config.other ? (
            <div>
              <label className={labelClass}>Other sources</label>
              <input
                type="text"
                inputMode="numeric"
                className={inputClass}
                value={counts.identificationOther}
                onChange={(e) => onChangeCount({ identificationOther: e.target.value })}
                placeholder="n"
              />
            </div>
          ) : null}
          {config.previous ? (
            <div>
              <label className={labelClass}>Previous studies</label>
              <input
                type="text"
                inputMode="numeric"
                className={inputClass}
                value={counts.identificationPrevious}
                onChange={(e) => onChangeCount({ identificationPrevious: e.target.value })}
                placeholder="n"
              />
            </div>
          ) : null}
          {config.dbDetail ? (
            <div className="sm:col-span-2">
              <label className={labelClass}>
                Note per source (shown under Databases in the diagram)
              </label>
              <input
                type="text"
                className={inputClass}
                value={counts.databaseDetailNote}
                onChange={(e) => onChangeCount({ databaseDetailNote: e.target.value })}
                placeholder="e.g. Scopus n=…, WoS n=…"
              />
            </div>
          ) : null}
          <div>
            <label className={labelClass}>Duplicates removed</label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              value={counts.duplicatesRemoved}
              onChange={(e) => onChangeCount({ duplicatesRemoved: e.target.value })}
              placeholder="n"
            />
          </div>
          <div>
            <label className={labelClass}>Records screened (title/abstract)</label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              value={counts.recordsScreened}
              onChange={(e) => onChangeCount({ recordsScreened: e.target.value })}
              placeholder="n"
            />
          </div>
          <div>
            <label className={labelClass}>Records excluded (title/abstract)</label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              value={counts.recordsExcludedTitleAbstract}
              onChange={(e) => onChangeCount({ recordsExcludedTitleAbstract: e.target.value })}
              placeholder="n"
            />
          </div>
          <div>
            <label className={labelClass}>Reports sought for retrieval</label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              value={counts.reportsSoughtRetrieval}
              onChange={(e) => onChangeCount({ reportsSoughtRetrieval: e.target.value })}
              placeholder="n"
            />
          </div>
          <div>
            <label className={labelClass}>Reports not retrieved</label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              value={counts.reportsNotRetrieved}
              onChange={(e) => onChangeCount({ reportsNotRetrieved: e.target.value })}
              placeholder="n"
            />
          </div>
          <div>
            <label className={labelClass}>Reports assessed for eligibility</label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              value={counts.reportsAssessedEligibility}
              onChange={(e) => onChangeCount({ reportsAssessedEligibility: e.target.value })}
              placeholder="n"
            />
          </div>
          <div>
            <label className={labelClass}>Reports excluded (full text)</label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              value={counts.reportsExcludedFullText}
              onChange={(e) => onChangeCount({ reportsExcludedFullText: e.target.value })}
              placeholder="n"
            />
          </div>
          <div>
            <label className={labelClass}>New studies included in review</label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              value={counts.studiesIncludedInReview}
              onChange={(e) => onChangeCount({ studiesIncludedInReview: e.target.value })}
              placeholder="n"
            />
          </div>
          {config.metaAnalysis ? (
            <>
              <div>
                <label className={labelClass}>Reports in qualitative synthesis</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className={inputClass}
                  value={counts.reportsInQualitativeSynthesis}
                  onChange={(e) => onChangeCount({ reportsInQualitativeSynthesis: e.target.value })}
                  placeholder="n"
                />
              </div>
              <div>
                <label className={labelClass}>Reports in meta-analysis</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className={inputClass}
                  value={counts.studiesInMetaAnalysis}
                  onChange={(e) => onChangeCount({ studiesInMetaAnalysis: e.target.value })}
                  placeholder="n"
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
