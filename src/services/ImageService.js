import axios from 'axios';

export const BASE_URL = "http://localhost:8080/api/v1";

export const uploadStudentImage = async form => {
    const config = {
        method: "POST",
        url: BASE_URL + `/student-image`,
        data: form,
        withCredentials: true,
        headers: {'Content-Type' : 'multipart/form-data'}
    }
    await axios(config);
}

export const downloadStudentImage = async studentID => {
    const config = {
        method: "GET",
        url: BASE_URL + `/student-image/${studentID}`,
        responseType: 'arraybuffer',
        withCredentials: true,
    }
    const { data: imageBytes } = await axios(config);
    let blob = new Blob([imageBytes], {type: "image/jpeg"});
    return URL.createObjectURL(blob);
}

