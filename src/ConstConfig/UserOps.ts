/* eslint-disable */
// * Interfaces should be const member to export it globally.
// * It should be json object.
export const UserOps = {
  DRAGPREVIEW : "DragPreview",
  DEMOGRAPHIC_API : "Demographics",
  REORDER: "REORDER",
  TERMLINK_DATA: 4,
  TERMLINK_AUDIENCE: 1,
  TERMLINK_MEASURE: 5,

  SAVE_MODAL: 0,
    DELETE_MODAL: 1,
    MESSAGE_BOX: 2,
    METHODOLOGY: 3,
    DELETE_AUDIENCE_SEGMENT: "DEL_AUDIENCE",
    SAVE_AUDIENCE: "SAVE_AUDIENCE",
    EDIT_AUDIENCE: "EDIT_AUDIENCE",
    LOAD_AUDIENCE: "LOAD_AUDIENCE",
    SEND_EMAIL: "SEND_EMAIL",
    SWITCH_MAPS: "SWITCH_MAP",
    Insights_API: "INSIGHTS_API",
    NONE: "",
  
    MOBILE: "MOBILE",
    DESKTOP: "DESKTOP",
    SUCCESS: "Success",
    OR: "or",
    AND: "and",
    INSIGHT_SOURCE_AUDIENCE: "AudienceSizer",
    LEFT: "left",
    RIGHT: "right",
    CATEGORY: "CAT",
    DELEMETER: "*",
    AGE65: "65+",
    AUDIENCELIST: "AUDIENCELIST",
    AUDIENCSIZER: "AUDISIZER",
    OVERWRITE_AUDIENCE: "OVERWRITE_AUDIENCE",
  
    /* Admin */
    GET_USERS: "GETUSERS",
    ADD_USER: "ADDUSER",
    ADMIN: "Admin",
    DELETE_USER: "DELETEUSER",
    EDIT_USER: "EDITUSER",
  
    GET_TRAITS: "GET_TRAITS",
    ADD_TRAITS: "ADDTRAITS",
    DELETE_TRAITS: "DELETE_TRAITS",
    EDIT_TRAITS: "EDITTRAITS",
    TRAIT_MOVE_UP: "TRAIT_MOVE_UP",
    TRAIT_MOVE_DOWN: "TRAIT_MOVE_DOWN",
  
  
    PREV_AUD: "prev",
    NEXT_AUD: "next",
    FIRST_AUD: "first",
    LAST_AUD: "last",
    PAGE_NUM: "pageSwitch",
  
    ADOPS: 'Ad ops',
    BETATESTER: 'Beta tester',
    CRMUPLOADER: 'CRM Uploader',
    USER: 'User',
    AUDIENCEBUILDER: 'Audience Builder',
    CAMPAIGNREQ: 'Campaign Request',
    REPORTINGUSER: 'Reporting',
    REQUESTS: "Requests",
    REQUESTER: "Requester",
    REQUESTMANAGER: "Request Manager",
    DOMOUSER: 'Domo User',
  
    // RED-3790
    REPORTINGDIGITAL: "Reporting - Digital Portal",
    REPORTINGTV: "Reporting - TV Portal",
    REPORTINGPACING: "Reporting - Digital Pacing",
    REPORTINGRECENTREPORT: "Reporting - Digital Recent Reports",
    REPORTINGEXCEL: "Reporting - Excel Export",
    REPORTINGPPT: "Reporting - PowerPoint Export",
    REPORTINGDOMO: "Reporting - Domo link",
  
    /* Reporting */
    PULL_REPORT: "PULL_REPORT",
    DOWNLOAD_REPORT: "DOWNLOAD_REPORT",
    LISTALL_REPORT: "LISTALL_REPORT",
  
  
    /* Campaign Status */
    CAMPAIGN_STATUS: "CAMPAIGN_STATUS",
  
  
    /*File Upload */
    UPLOAD_FILE: "UPLOAD_FILE",
  
    LISTALL_CRM: "LISTALL_CRM",
  
    NEGATIVE_ONE: -1,
    NEGATIVE_SEVEN: -7,
    OK: 101,
    CANCEL: 102,
    CLOSE: 103
}

export default UserOps;