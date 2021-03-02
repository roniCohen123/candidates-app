import React, {FunctionComponent, useEffect} from 'react';
import {useStore} from "../../stores/helpers/use-store";
import {CandidateDetails} from "../../components/candidate-details/candidate-details";
import {Candidate} from "../../stores/data/candidates/candidates-store";
import {observer} from "mobx-react-lite";

const CandidatesList: FunctionComponent = () => {
    const { data: { candidatesStore } } = useStore();

    useEffect(() => {
        candidatesStore.fetch();
    }, [candidatesStore]);

    return <div>
        {
            candidatesStore.candidates.map((candidate: Candidate) => <CandidateDetails key={candidate.name} candidate={candidate}/>)
        }
    </div>
};

export default observer(CandidatesList);
