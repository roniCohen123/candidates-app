import {action, makeObservable, observable} from "mobx";
import CandidatesService from "../../../services/candidates-service";
import moment from 'moment';

export interface Experience {
    start_date: string;
    end_date: string;
    title: string;
    gap_between_jobs: number;
}

export interface Candidate {
    name: string;
    experience: Experience[];
}


class CandidatesStore {
    @observable.shallow candidates: Candidate[] = [];

    constructor() {
        makeObservable(this);
    }

    @action async fetch(): Promise<void> {
        const candidatesResponse = await CandidatesService.getCandidates();

        this.candidates = candidatesResponse.map((candidate, index) => {
            const { experience: experiences } = candidate;

            return {
                name: candidate.contact_info.name.formatted_name,
                experience: experiences.map((experiense: any) => {
                    const { start_date, end_date, title } = experiense;
                    let prevJob = null;

                    if (index < experiences.length - 1) {
                        prevJob = experiences[index + 1];
                    }

                    return {
                        start_date,
                        end_date,
                        title,
                        gap_between_jobs: prevJob ? this.getGapsBetweenJobs(experiense, prevJob): ''
                    }
                })
            };
        });
    }

    getGapsBetweenJobs(currentJob: Experience, prevJob: Experience): string {
       const daysDiff = moment(prevJob.end_date).diff(currentJob.start_date, 'days');

       if (daysDiff <= 0) {
           return '';
       }

        if (daysDiff > 365) {
            return `${Math.round(daysDiff / 365)} years`;
        }

        if (daysDiff < 31) {
            return `${daysDiff} days`;
        }

        return `${Math.round(daysDiff / 30)} months`;
    }
}

export default CandidatesStore;
