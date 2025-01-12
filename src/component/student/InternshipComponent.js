import React, {useState} from "react";
import {useParams} from 'react-router';
import {baseUrl} from '../baseUrl';
import LoadingComponent from '../LoadingComponent';
import { Document, Page } from 'react-pdf';

function LoadPDF({internship}){
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    if(internship.certificate != null) {
        return(
            <div>
            <Document
                file={internship.certificate}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
            </div>
        );
    }
    else if(internship.errMess) {
        return(
            <h2>{internship.errMess}</h2>
        );
    }
    else {
        return(
            <LoadingComponent/>
        );
    }
}

function InternshipCertificate(props){
    const {studentId, internshipId} = useParams();
    if(props.internship.certificate == null && !props.internship.errMess && !props.internship.isLoading){
        props.loadInternshipCertificate(studentId, internshipId);
    }
    return(
        <LoadPDF internship = {props.internship}/>
    );
};

export default InternshipCertificate;