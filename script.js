$(document).ready(function () {
    const TAG_ACTIVE_CLASS = 'tag--active';
    const SEARCH_HIDDEN_CLASS = 'search--hidden';
    const CLOSE_TAG_CLASS = 'close-tag';
    const TAG_CLASS = 'tag';
  
    const jobsListings = [
        {
            "id": 1,
            "company": "Photosnap",
            "logo": "./images/photosnap.svg",
            "new": true,
            "featured": true,
            "position": "Senior Frontend Developer",
            "role": "Frontend",
            "level": "Senior",
            "postedAt": "1d ago",
            "contract": "Full Time",
            "location": "USA Only",
            "languages": ["HTML", "CSS", "JavaScript"],
            "tools": []
          },
          {
            "id": 2,
            "company": "Manage",
            "logo": "./images/manage.svg",
            "new": true,
            "featured": true,
            "position": "Fullstack Developer",
            "role": "Fullstack",
            "level": "Midweight",
            "postedAt": "1d ago",
            "contract": "Part Time",
            "location": "Remote",
            "languages": ["Python"],
            "tools": ["React"]
          },
          {
            "id": 3,
            "company": "Account",
            "logo": "./images/account.svg",
            "new": true,
            "featured": false,
            "position": "Junior Frontend Developer",
            "role": "Frontend",
            "level": "Junior",
            "postedAt": "2d ago",
            "contract": "Part Time",
            "location": "USA Only",
            "languages": ["JavaScript"],
            "tools": ["React", "Sass"]
          },
          {
            "id": 4,
            "company": "MyHome",
            "logo": "./images/myhome.svg",
            "new": false,
            "featured": false,
            "position": "Junior Frontend Developer",
            "role": "Frontend",
            "level": "Junior",
            "postedAt": "5d ago",
            "contract": "Contract",
            "location": "USA Only",
            "languages": ["CSS", "JavaScript"],
            "tools": []
          },
          {
            "id": 5,
            "company": "Loop Studios",
            "logo": "./images/loop-studios.svg",
            "new": false,
            "featured": false,
            "position": "Software Engineer",
            "role": "Fullstack",
            "level": "Midweight",
            "postedAt": "1w ago",
            "contract": "Full Time",
            "location": "Worldwide",
            "languages": ["JavaScript"],
            "tools": ["Ruby", "Sass"]
          },
          {
            "id": 6,
            "company": "FaceIt",
            "logo": "./images/faceit.svg",
            "new": false,
            "featured": false,
            "position": "Junior Backend Developer",
            "role": "Backend",
            "level": "Junior",
            "postedAt": "2w ago",
            "contract": "Full Time",
            "location": "UK Only",
            "languages": ["Ruby"],
            "tools": ["RoR"]
          },
          {
            "id": 7,
            "company": "Shortly",
            "logo": "./images/shortly.svg",
            "new": false,
            "featured": false,
            "position": "Junior Developer",
            "role": "Frontend",
            "level": "Junior",
            "postedAt": "2w ago",
            "contract": "Full Time",
            "location": "Worldwide",
            "languages": ["HTML", "JavaScript"],
            "tools": ["Sass"]
          },
          {
            "id": 8,
            "company": "Insure",
            "logo": "./images/insure.svg",
            "new": false,
            "featured": false,
            "position": "Junior Frontend Developer",
            "role": "Frontend",
            "level": "Junior",
            "postedAt": "2w ago",
            "contract": "Full Time",
            "location": "USA Only",
            "languages": ["JavaScript"],
            "tools": ["Vue", "Sass"]
          },
          {
            "id": 9,
            "company": "Eyecam Co.",
            "logo": "./images/eyecam-co.svg",
            "new": false,
            "featured": false,
            "position": "Full Stack Engineer",
            "role": "Fullstack",
            "level": "Midweight",
            "postedAt": "3w ago",
            "contract": "Full Time",
            "location": "Worldwide",
            "languages": ["JavaScript", "Python"],
            "tools": ["Django"]
          },
          {
            "id": 10,
            "company": "The Air Filter Company",
            "logo": "./images/the-air-filter-company.svg",
            "new": false,
            "featured": false,
            "position": "Front-end Dev",
            "role": "Frontend",
            "level": "Junior",
            "postedAt": "1mo ago",
            "contract": "Part Time",
            "location": "Worldwide",
            "languages": ["JavaScript"],
            "tools": ["React", "Sass"]
          }
    ];
  
    function getTagHTML(tag, tagClasses) {
      return `<span class="${tagClasses}">
                  ${tag}
              </span>`;
    }
  
    function getJobListingHTML(jobData, filterTags = []) {
      const JOB_TAGS_PLACEHOLDER = '###JOB_TAGS###';
      let jobListingHTML = `
          <div class="jobs__item" data-job-id="${jobData.id}">
              <div class="jobs__column jobs__column--left">
                  <img src="${jobData.logo}" alt="${jobData.company}" class="jobs__img" />
                  <div class="jobs__info">
                      <span class="jobs__company">${jobData.company}</span>
                      <span class="jobs__title">${jobData.position}</span>
                      
                      <ul class="jobs__details">
                          <li class="jobs__details-item">${jobData.postedAt}</li>
                          <li class="jobs__details-item">${jobData.contract}</li>
                          <li class="jobs__details-item">${jobData.location}</li>
                      </ul>
                  </div>
              </div>
              <div class="jobs__column jobs__column--right">
                  ${JOB_TAGS_PLACEHOLDER}
              </div>
          </div>
      `;
  
      const tagsList = [
        jobData.role,
        jobData.level,
        ...(jobData.languages || []),
        ...(jobData.tools || [])
      ];
      const tagsListLowercase = tagsList.map(t => t && t.toLowerCase());
      const passesFilter = !filterTags.length || filterTags.every(tag => (
        tagsListLowercase.includes(tag && tag.toLowerCase())
      ));
  
      if (!passesFilter) {
        return '';
      }
  
      const tagsString = tagsList.reduce((acc, currentTag) => {
        const activeClass = (filterTags.includes(currentTag) && TAG_ACTIVE_CLASS) || '';
  
        return acc + getTagHTML(currentTag, `${TAG_CLASS} ${activeClass}`);
      }, '');
  
      return jobListingHTML.replace(JOB_TAGS_PLACEHOLDER, tagsString);
    }
    
    function updateJobListings() {
      const jobsListingsHTML = jobsListings.map(job => getJobListingHTML(job, []));
      $('#jobs').html(jobsListingsHTML.join(''));
    }

      // Function to open the popup when the "Add Job" button is clicked
      $('#add-job').on('click', function () {
        $('#add-job-popup').show();
      });
    
      // Function to close the popup
      $('.close-popup').on('click', function () {
        $('#add-job-popup').hide();
      });
    
      // Function to handle form submission and add a new job
      $('#new-job-form').on('submit', function (event) {
        event.preventDefault();
    
        // Collect user input from the form
        const company = $('#company').val();
        const position = $('#position').val();
        const location = $('#location').val();
        const level = $('#level').val();
        const tools = $('#tools').val().split(',').map(tool => tool.trim());
    
        // Create a new job object
        const newJob = {
          "id": jobsListings.length + 1,
          "company": company,
          "logo": "./images/photosnap.svg",
          "new": true,
          "featured": false,
          "position": position,
          "role": "Frontend", // You can modify this as needed
          "level": level,
          "postedAt": "Just now",
          "contract": "Full Time",
          "location": location,
          "languages": ["HTML", "CSS", "JavaScript"], // You can modify this as needed
          "tools": tools
        };
    
        // Add the new job to the list
        jobsListings.push(newJob);
    
        // Close the popup
        $('#add-job-popup').hide();
    
        // Update the job listings display (You need to implement this function)
        updateJobListings();
      });
    

      function openJobDetailsPopup(job) {
        const jobDetailsHTML = `
          <div>
            <h3>${job.company}</h3>
            <p>New: ${job.new ? "Yes" : "No"}</p>
            <p>Featured: ${job.featured ? "Yes" : "No"}</p>
            <p>Position: ${job.position}</p>
            <p>Role: ${job.role}</p>
            <p>Level: ${job.level}</p>
            <p>Posted At: ${job.postedAt}</p>
            <p>Contract: ${job.contract}</p>
            <p>Location: ${job.location}</p>
            <p>Languages: ${job.languages.join(', ')}</p>
            <p>Tools: ${job.tools.join(', ')}</p>
          </div>
        `;
        $('#job-details-content').html(jobDetailsHTML);
        $('#job-details-popup').show();
      }

      $('#jobs').on('click', '.jobs__item', function () {
        const jobId = $(this).data('job-id');
        const job = jobsListings.find(job => job.id === jobId);
        if (job) {
          openJobDetailsPopup(job);
        }
      });

    function toggleClass(el, className) {
      el.toggleClass(className);
    }
  
    function getSearchBarTags(tagValue) {
      const searchBarTags = $('#search-content span').map(function () {
        return $(this).text().trim();
      }).get();
  
      if (searchBarTags.includes(tagValue)) {
        return searchBarTags.filter(tag => tag !== tagValue);
      } else {
        return [...searchBarTags, tagValue];
      }
    }
  
    function setJobsListings(filterTags) {
      const jobsListingsHTML = jobsListings.reduce((acc, currentListing) => {
        return acc + getJobListingHTML(currentListing, filterTags);
      }, '');
  
      $('#jobs').html(jobsListingsHTML);
    }
  
    function displaySearchWrapper(display = false) {
      const searchWrapper = $('#search');
  
      if (display) {
        searchWrapper.removeClass(SEARCH_HIDDEN_CLASS);
      } else {
        searchWrapper.addClass(SEARCH_HIDDEN_CLASS);
      }
    }
    
    
  // Function to open the job details popup
  function openJobDetailsPopup(job) {
    const jobDetailsHTML = `
      <div>
        <h3>${job.company}</h3>
        <p>New: ${job.new ? "Yes" : "No"}</p>
        <p>Featured: ${job.featured ? "Yes" : "No"}</p>
        <p>Position: ${job.position}</p>
        <p>Role: ${job.role}</p>
        <p>Level: ${job.level}</p>
        <p>Posted At: ${job.postedAt}</p>
        <p>Contract: ${job.contract}</p>
        <p>Location: ${job.location}</p>
        <p>Languages: ${job.languages.join(', ')}</p>
        <p>Tools: ${job.tools.join(', ')}</p>
      </div>
    `;
    $('#job-details-content').html(jobDetailsHTML);
    $('#job-details-popup').show();
  }

  // Function to close the job details popup
  $('#close-details-popup').on('click', function () {
    $('#job-details-popup').hide();
  });

  // Event handler to open job details popup when a job listing is clicked
  $('#jobs').on('click', '.jobs__item', function () {
    const jobId = $(this).data('job-id');
    const job = jobsListings.find(job => job.id === jobId);
    if (job) {
      openJobDetailsPopup(job);
    }
  });

    function setSearchbarContent(tags) {
      const searchContentEl = $('#search-content');
      searchContentEl.html(tags.map(tag => getTagHTML(tag, CLOSE_TAG_CLASS)).join(''));
    }
  
    function resetState() {
      const searchContentEl = $('#search-content');
      searchContentEl.html('');
  
      setJobsListings();
      displaySearchWrapper(false);
      toggleClass(targetEl, TAG_ACTIVE_CLASS);
    }
  
    $(document).on('click', (event) => {
      const targetEl = $(event.target);
      const targetText = targetEl.text().trim();
  
      if (targetEl.attr('id') === 'clear' || !targetText) {
        resetState();
        return;
      }
  
      if (!targetEl.hasClass(TAG_CLASS) && !targetEl.hasClass(CLOSE_TAG_CLASS)) {
        return;
      }
  
      const searchBarTags = getSearchBarTags(targetText);
  
      setSearchbarContent(searchBarTags);
      toggleClass(targetEl, TAG_ACTIVE_CLASS);
      displaySearchWrapper(searchBarTags.length > 0);
      setJobsListings(searchBarTags);
    });
  
    setJobsListings();
  });
  