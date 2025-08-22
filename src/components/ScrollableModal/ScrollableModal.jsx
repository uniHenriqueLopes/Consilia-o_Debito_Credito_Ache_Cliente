import React, { useState } from "react";

function ScrollableModal() {
    const [title, setTitle] = useState("");
    const [project, setProject] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [estimatedHour, setEstimatedHour] = useState("09:30");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("");
    const [permission, setPermission] = useState("");
    const [deadline, setDeadline] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [responsiblePerson, setResponsiblePerson] = useState("James, Harry");
    const [description, setDescription] = useState("");
    const [summary, setSummary] = useState("");

    return (
        <div className="scrollableModal">
            <div
                className="offcanvas offcanvas-end customeoff"
                tabIndex="-1"
                id="offcanvasExample1"
            >
                <div className="offcanvas-header">
                    <h5 className="modal-title" id="#gridSystemModal1">
                        Add New Task
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="offcanvas-body">
                    <div className="container-fluid">
                        <form>
                            <div className="row">
                                <div className="col-xl-6 mb-3">
                                    <label
                                        htmlFor="exampleFormControlInputfirst"
                                        className="form-label"
                                    >
                                        Title<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInputfirst"
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label className="form-label">
                                        Project
                                        <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="default-select style-1 form-control"
                                        value={project}
                                        onChange={(e) => setProject(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="Salesmate">Salesmate</option>
                                        <option value="ActiveCampaign">ActiveCampaign</option>
                                        <option value="Insightly">Insightly</option>
                                    </select>
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label
                                        htmlFor="exampleFormControlInputthree"
                                        className="form-label"
                                    >
                                        Start Date
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="exampleFormControlInputthree"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label
                                        htmlFor="exampleFormControlInputfour"
                                        className="form-label"
                                    >
                                        End Date
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="exampleFormControlInputfour"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label className="form-label">
                                        Estimated Hour
                                        <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={estimatedHour}
                                            onChange={(e) => setEstimatedHour(e.target.value)}
                                        />
                                        <span className="input-group-text">
                                            <i className="fas fa-clock"></i>
                                        </span>
                                    </div>
                                </div>
                                {/* Continue updating other fields similarly */}
                                <div className="col-xl-6 mb-3">
                                    <label className="form-label">
                                        Responsible Person
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        name="tagify"
                                        className="form-control py-0 ps-0 h-auto"
                                        value={responsiblePerson}
                                        onChange={(e) =>
                                            setResponsiblePerson(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-xl-12 mb-3">
                                    <label className="form-label">
                                        Description
                                        <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        rows="3"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="col-xl-12 mb-3">
                                    <label className="form-label">
                                        Summary
                                        <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        rows="3"
                                        className="form-control"
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-danger light ms-1" type="button">
                                    Cancel
                                </button>
                                <button className="btn btn-primary me-1" type="submit">
                                    Help Desk
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScrollableModal;
