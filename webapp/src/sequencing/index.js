import React from "react";
import { Panel } from 'primereact/panel';
import { Message } from 'primereact/message';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Analyze } from "../services";
import Results from "./analyzeResults";

function Page() {
  const [message, setMessage] = React.useState(null);
  const [sequence, setSequence] = React.useState("-Gdo-Gdo-Ado-Ado-Tdo-Gro-Gro-Cro-Uro-Uro-Uro-Ur");
  const [results, setResults] = React.useState(null);

  const onSubmit = async (sequence) => {
    try {
      const resp = await Analyze(sequence);
      if (resp.error) {
        setResults(null);
        setMessage(resp.error);
      } else {
        setResults(resp);
      }
    } catch (err) {
      console.log(err);
      setResults(null);
      setMessage(err.message);
    }
  }

  return ( 
    <div className="flex flex-column p-3">
      {message && <Message text={message} className="mb-2" />}
      <Panel header="Analyze Sequence" className="mb-4 flex flex-column">

        <InputTextarea value={sequence} 
          onChange={(e) => setSequence(e.target.value)}
          rows={5} cols={30}
        />

        <div>
          <Button label="Analyze" className="mt-2" onClick={() => onSubmit(sequence)} />
        </div>

        {results && <div>
          <Results results={results} />
        </div>}
        
      </Panel>
    </div>
  );
}

export default Page;