                                                    />
    < span > Change Image</span >
                                                </div >
                                            ) : (
    <div className="upload-placeholder">
        <ImageIcon size={24} />
        <span>Click to upload image</span>
    </div>
)}
                                        </label >
                                    </div >
                                </div >

                                <div className="full-width">
                                    <h3>Descriptions</h3>
                                </div>

                                <div className="form-group full-width">
                                    <label>French Description</label>
                                    <textarea
                                        name="desc_fr"
                                        value={formData.description.fr}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>English Description</label>
                                    <textarea
                                        name="desc_en"
                                        value={formData.description.en}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Arabic Description</label>
                                    <textarea
                                        name="desc_ar"
                                        value={formData.description.ar}
                                        onChange={handleInputChange}
                                        rows="3"
                                        dir="rtl"
                                    />
                                </div>
                            </div >
    <div className="modal-actions">
        <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
            Cancel
        </button>
        <button type="submit" className="save-btn">
            <Save size={18} style={{ marginRight: '8px' }} />
            Save Activity
        </button>
    </div>
                        </form >
                    </div >
                </div >
            )}
        </div >
    );
};

export default ActivitiesManager;
