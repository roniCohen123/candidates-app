import {FunctionComponent} from "react";
import {Candidate} from "../../stores/data/candidates/candidates-store";

interface Props {
    candidate: Candidate;
}

export const CandidateDetails: FunctionComponent<Props> = ({candidate}: Props) => {
    const { name, experience } = candidate;
    return (<div>
        <div>{`Hello ${name}`}</div>
        {
            experience.map(({title, start_date, end_date, gap_between_jobs}) => (
                <>
                    <div>{`Worked as: ${title}, From ${start_date} To ${end_date}`}</div>
                    {
                        gap_between_jobs &&
                        <div>{`Gap between jobs: ${gap_between_jobs}`}</div>
                    }
                    <br/>
                </>

            ))
        }
    </div>);
};
