function TeacherService(){
    //Show
  this.TeacherApi = function(){
      return axios({
        url:"https://618eab9a50e24d0017ce13c9.mockapi.io/dataGV",
        method:"GET",
      })
  };

  //Delete
  this.DeleteApi = function(id){
      return axios({
          url:`https://618eab9a50e24d0017ce13c9.mockapi.io/dataGV/${id}`,
          method:"DELETE",
      })
  };

  //Add
  this.addApi = function(newteacher){
      return axios({
          url:"https://618eab9a50e24d0017ce13c9.mockapi.io/dataGV",
          method:"POST",
          data:newteacher,
      })
  };

  //GetApi
  this.getDataApi = function (id){
      return axios({
          url:`https://618eab9a50e24d0017ce13c9.mockapi.io/dataGV/${id}`,
          method:"GET",
      })
  }

  //Update
  this.updateApi = function(teacher){
      return axios({
          url:`https://618eab9a50e24d0017ce13c9.mockapi.io/dataGV/${teacher.id}`,
          method:"PUT",
          data:teacher,
      })
  }
}