"use client";
import axios from "axios";
import { useState } from "react";
import Login from "../login/page";

const CreatePost = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  const [isSponsored, setIsSponsored] = useState(false);
  const [postData, setPostData] = useState({});
  const [contentSections, setContentSections] = useState([
    { id: 1, type: "", items: [] },
  ]);
  const [formErrors, setFormErrors] = useState({});
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name == "imagePost") {
      const file = event.target.files[0];
      setPostData((values) => ({ ...values, [name]: file }));
      return;
    }
    setPostData((values) => ({ ...values, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!postData.postHeading) errors.postHeading = "Post Heading is required*";
    if (!postData.subheading) errors.subheading = "Sub Heading is required*";
    if (!postData.imagePost) errors.imagePost = "Post image is required*";
    if (!postData.category) errors.category = "Category is required*";
    if (!postData.createdBy) errors.createdBy = "Required*";
    if (!postData.designation) errors.designation = "Designation is required*";
    if (!postData.description) errors.description = "Description is required*";
    return errors;
  };

  const addContentSection = () => {
    setContentSections([
      ...contentSections,
      { id: contentSections.length + 1, type: "", items: [] },
    ]);
  };

  const removeContentSection = (id) => {
    setContentSections(contentSections.filter((section) => section.id !== id));
  };

  const handleTypeChange = (id, type) => {
    setContentSections(
      contentSections.map((section) =>
        section.id === id ? { ...section, type } : section
      )
    );
  };

  const contentHandler = (event, id) => {
    const { name, value, files } = event.target;

    setContentSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id !== id) return section;

        if (name === "contentHeading[]") {
          return {
            ...section,
            contentHeading: value, // Properly set contentHeading
          };
        }

        if (name === "contentDescription[]") {
          return {
            ...section,
            contentDescription: value, // Properly set contentDescription
          };
        }

        if (name === "imageUpload[]") {
          const file = files[0];
          console.log(file);
          return {
            ...section,
            imageUpload: file,
          };
        }

        if (name === "quoteText[]" || name === "quoteAuthor[]") {
          const existingQuote = section.items.find(
            (item) => item.type === "quote"
          ) || {
            text: "",
            author: "",
          };

          return {
            ...section,
            items: [
              ...section.items.filter((item) => item.type !== "quote"),
              {
                type: "quote",
                text: name === "quoteText[]" ? value : existingQuote.text,
                author: name === "quoteAuthor[]" ? value : existingQuote.author,
              },
            ],
          };
        }

        return section;
      })
    );
  };

  const addListItem = (id) => {
    setContentSections(
      contentSections.map((section) =>
        section.id === id
          ? { ...section, items: [...section.items, ""] }
          : section
      )
    );
  };

  const handleListItemChange = (id, index, value) => {
    setContentSections(
      contentSections.map((section) =>
        section.id === id
          ? {
              ...section,
              items: section.items.map((item, i) =>
                i === index ? value : item
              ),
            }
          : section
      )
    );
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(contentSections)
  //   setPostData((values) => ({ ...values, contentSections }));
  //   // console.log(postData);
  //   const errors = validate();
  //   setFormErrors(errors);
  //   const formData = new FormData();

  //   for (const key in postData) {
  //     if (postData[key] instanceof File || postData[key] instanceof Blob) {
  //       // For file or Blob objects
  //       formData.append(key, postData[key]);
  //     } else {
  //       // For other data types (e.g., strings, numbers)
  //       formData.append(key, postData[key]);
  //     }
  //   }
  //   console.log(postData)

  //   try {
  //     // console.log(postData);
  //     const response = await axios.post(
  //       `${API_URL}/api/posts/create`,
  //       postData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(response);
  //     if (response.status == 201) {
  //       alert("Post created successfully!");

  //     } else {
  //       alert("Error creating post.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate input fields
  //   const errors = validate();
  //   setFormErrors(errors);
  //   if (Object.keys(errors).length > 0) return;

  //   // Prepare FormData
  //   const formData = new FormData();
  //   console.log("postData" , postData)
  //   console.log("contentSection", contentSections)
  //   // Append other fields
  //   for (const key in postData) {
  //     if (postData[key] instanceof File || postData[key] instanceof Blob) {
  //       formData.append(key, postData[key]); // File or Blob
  //     } else {
  //       formData.append(key, postData[key]); // Other data
  //     }
  //   }

  //   // // Serialize and append contentSections
  //   contentSections.forEach((section, index) => {
  //     formData.append(`contentDescription`, section.contentDescription);
  //     formData.append(`contentHeading`, section.contentHeading);
  //     formData.append(`type`, section.type);

  //     // Append files properly
  //       formData.append(`imageUpload`, section.imageUpload || null);
  //   });

  //   // Debugging FormData contents
  //   // for (let pair of formData.entries()) {
  //   //   console.log(pair[0] + ": ", pair[1]);
  //   // }

  //   try {
  //     const response = await axios.post(`${API_URL}/api/posts/create`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (response.status === 201) {
  //       alert("Post created successfully!");
  //     } else {
  //       alert("Error creating post.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("An error occurred while submitting the form.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Prepare FormData
    const formData = new FormData();

    console.log("postData", postData);
    console.log("contentSection", contentSections);
    // Append basic post fields
    for (const key in postData) {
      if (postData[key] instanceof File || postData[key] instanceof Blob) {
        formData.append(key, postData[key]); // Append file
      } else {
        formData.append(key, postData[key]); // Append other fields
      }
    }

    // Append each contentSection separately
    // formData.append("contentSections", JSON.stringify(contentSections.map((section, index) => ({
    //   contentHeading: section.contentHeading,
    //   contentDescription: section.contentDescription,
    //   type: section.type,
    //   items: section.items,
    //   quoteText: section.quoteText,
    //   quoteAuthor: section.quoteAuthor,
    //   imageUpload: section.imageUpload,
    // }))));

    contentSections.forEach((section, index) => {
      formData.append(`contentSections[${index}][contentHeading]`, section.contentHeading);
      formData.append(`contentSections[${index}][contentDescription]`, section.contentDescription || '');
      formData.append(`contentSections[${index}][type]`, section.type || '');
      formData.append(`contentSections[${index}][quoteText]`, section.quoteText || '');
      formData.append(`contentSections[${index}][quoteAuthor]`, section.quoteAuthor || '');
      formData.append(`contentSections[${index}][items]`, JSON.stringify(section.items || []));
  
      // If an image is included in contentSection, append it separately
      if (section.imageUpload && section.imageUpload instanceof File) {
          formData.append(`contentSections[${index}][imageUpload]`, section.imageUpload);
      }
  });


    // Debugging FormData contents
    const formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    console.log(formDataObject);

    try {
      const response = await axios.post(
        `${API_URL}/api/posts/create`,
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Post created successfully!");
      } else {
        alert("Error creating post.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <>
      {!isAdmin ? (
        <Login/>
      ) : (
        <div className="w-full md:p-8 p-4 border-t-4 border-lime">
          <h1 className="text-center font-semibold text-3xl text-gray-700 dark:text-white mb-8">
            Create a New Post
          </h1>
          <div className="w-full flex justify-center ">
            <form
              id="createPostForm"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="w-full max-w-4xl bg-white dark:bg-[#04031D] shadow-md rounded-lg md:p-8 p-4 border  border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Post Heading */}
                <div>
                  <label
                    htmlFor="postHeading"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Post Heading
                  </label>
                  <input
                    type="text"
                    id="postHeading"
                    name="postHeading"
                    className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                    onChange={inputHandler}
                  />
                  {formErrors.postHeading && (
                    <p className="text-red-500 text-xs">
                      {formErrors.postHeading}
                    </p>
                  )}
                </div>

                {/* Subheading */}
                <div>
                  <label
                    htmlFor="subheading"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Subheading
                  </label>
                  <input
                    type="text"
                    id="subheading"
                    name="subheading"
                    className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                    onChange={inputHandler}
                  />
                  {formErrors.subheading && (
                    <p className="text-red-500 text-xs">
                      {formErrors.subheading}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                    onChange={inputHandler}
                  >
                    <option value="">Select a Category</option>
                    <option value="marketing">Marketing</option>
                    <option value="advertising">Advertising</option>
                    <option value="market trends">Market Trends</option>
                    <option value="tech moves">Tech Moves</option>
                    <option value="startups">Startups</option>
                  </select>
                  {formErrors.category && (
                    <p className="text-red-500 text-xs">
                      {formErrors.category}
                    </p>
                  )}
                </div>

                {/* Image Post */}
                <div>
                  <label
                    htmlFor="imagePost"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Image Post
                  </label>
                  <input
                    type="file"
                    id="imagePost"
                    name="imagePost"
                    className="mt-1 block w-full text-sm text-gray-500"
                    onChange={inputHandler}
                  />
                  {formErrors.imagePost && (
                    <p className="text-red-500 text-xs">
                      {formErrors.imagePost}
                    </p>
                  )}
                </div>

                {/* Created By */}
                <div>
                  <label
                    htmlFor="createdBy"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Created By
                  </label>
                  <input
                    type="text"
                    id="createdBy"
                    name="createdBy"
                    className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                    onChange={inputHandler}
                  />
                  {formErrors.createdBy && (
                    <p className="text-red-500 text-xs">
                      {formErrors.createdBy}
                    </p>
                  )}
                </div>

                {/* Designation */}
                <div>
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                    onChange={inputHandler}
                  />
                  {formErrors.designation && (
                    <p className="text-red-500 text-xs">
                      {formErrors.designation}
                    </p>
                  )}
                </div>
              </div>

              {/* Post Description */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Post Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                  onChange={inputHandler}
                />
                {formErrors.description && (
                  <p className="text-red-500 text-xs">
                    {formErrors.description}
                  </p>
                )}
              </div>

              <h1 className="text-sm font-bold text-gray-500 dark:text-gray-200 ">
                If Sponsored{" "}
                <input
                  type="checkbox"
                  name="isSponsored"
                  id="isSponsored"
                  className={`size-4 
                  ${!isSponsored ? "mb-5" : "mb-0"}`}
                  onChange={() => {
                    inputHandler, setIsSponsored(!isSponsored);
                  }}
                />
              </h1>
              <div
                className={`border-t-2 border-b-2 border-lime py-2 my-10 space-y-5 ${
                  isSponsored ? "block" : "hidden"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                  {/* Sponsored By */}
                  <div>
                    <label
                      htmlFor="sponsoredBy"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Sponsored By
                    </label>
                    <input
                      type="text"
                      id="sponsoredBy"
                      name="sponsoredBy"
                      className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      onChange={inputHandler}
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      onChange={inputHandler}
                    />
                  </div>
                  {/* Company Logo */}
                  <div>
                    <label
                      htmlFor="companyLogo"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Company Logo
                    </label>
                    <input
                      type="file"
                      id="companyLogo"
                      name="companyLogo"
                      className="mt-1 block w-full text-sm text-gray-500"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Content Section
              </h3>
              {contentSections.map((section) => (
                <div
                  key={section.id}
                  className="border dark:border-none p-4 rounded-lg mb-6 bg-gray-50 dark:bg-[#141332]"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label
                        htmlFor={`contentHeading${section.id}`}
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Content Heading
                      </label>
                      <input
                        type="text"
                        id={`contentHeading${section.id}`}
                        name="contentHeading[]"
                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                        onChange={(e) => contentHandler(e, section.id)}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`contentDescription${section.id}`}
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Content Description
                      </label>
                      <textarea
                        id={`contentDescription${section.id}`}
                        name="contentDescription[]"
                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                        onChange={(e) => contentHandler(e, section.id)}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`contentType${section.id}`}
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Content Type
                      </label>
                      <select
                        id={`contentType${section.id}`}
                        name="contentType[]"
                        onChange={(e) =>
                          handleTypeChange(section.id, e.target.value)
                        }
                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      >
                        <option value="">Select Content Type</option>
                        <option value="image">Image</option>
                        <option value="list">List</option>
                        <option value="quote">Quote</option>
                      </select>
                    </div>

                    {section.type === "image" && (
                      <div>
                        <label
                          htmlFor={`imageUpload${section.id}`}
                          className="block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Upload Image
                        </label>
                        <input
                          type="file"
                          id={`imageUpload${section.id}`}
                          name={`imageUpload[]`}
                          className="mt-1 block w-full text-sm text-gray-500"
                          onChange={(e) => contentHandler(e, section.id)}
                          accept="image/*"
                        />
                      </div>
                    )}

                    {section.type === "list" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">
                          List Items
                        </label>
                        {section.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 mb-2"
                          >
                            <input
                              type="text"
                              value={item}
                              onChange={(e) =>
                                handleListItemChange(
                                  section.id,
                                  index,
                                  e.target.value
                                )
                              }
                              name={`listItems[${section.id}][]`}
                              placeholder="Enter List Item"
                              className="block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addListItem(section.id)}
                          className="text-sm text-lime-600 hover:underline"
                        >
                          Add More List Items
                        </button>
                      </div>
                    )}

                    {section.type === "quote" && (
                      <div>
                        <label
                          htmlFor={`quoteText${section.id}`}
                          className="block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Quote
                        </label>
                        <input
                          type="text"
                          id={`quoteText${section.id}`}
                          name="quoteText[]"
                          className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                          onChange={(e) => contentHandler(e, section.id)}
                        />
                        <br />
                        <label
                          htmlFor={`quoteAuthor${section.id}`}
                          className="block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Created By
                        </label>
                        <input
                          type="text"
                          id={`quoteAuthor${section.id}`}
                          name="quoteAuthor[]"
                          className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm border focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                          onChange={(e) => contentHandler(e, section.id)}
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => removeContentSection(section.id)}
                      className="text-sm text-red-600 hover:underline mt-2"
                    >
                      Remove Content Section
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={addContentSection}
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
                >
                  Add New Content Section
                </button>
                <button
                  type="submit"
                  className="px-16 py-2 bg-[#6DBA16] hover:bg-[#7ab03c] text-white dark:text-white text-sm font-semibold  rounded-md hover:bg-lime-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
