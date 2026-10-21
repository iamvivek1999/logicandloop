/** Illustrative Loop OS activity log. Shown on dark backgrounds only. */
export default function SampleLog() {
  return (
    <>
      <ol className="log" aria-label="Sample Loop OS activity log">
        <li><time>09:02</time><span>Research agent drafted the Monday market brief</span><em>Done</em></li>
        <li><time>09:04</time><span>Sales agent prepared the brief for the 11:30 call</span><em>Done</em></li>
        <li><time>09:10</time><span>Ops agent wants to send the weekly client update</span><em className="is-wait">Waiting for your approval</em></li>
      </ol>
      <p className="sample__cap">Sample activity log, illustrative.</p>
    </>
  );
}
