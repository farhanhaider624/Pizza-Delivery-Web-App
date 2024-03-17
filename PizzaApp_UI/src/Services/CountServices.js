class CountServices{
    getCount = async () => {
        try {
          const response = await fetch("http://localhost:8000/get-count");
          const result = await response.json();
          return result.count;
        } catch (error) {
          console.error(error);
        }
      };

      updateCount=async()=>{
        try {
          await fetch("http://localhost:8000/update-count", {
            method: "POST",
            body: JSON.stringify({ count: 1 }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          console.error(error);
        }
      }

      addCount = async (count) => {
        try {
          let result = await fetch("http://localhost:8000/add-count", {
            method: "post",
            body: JSON.stringify({ count }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          result = await result.json();
        } catch (error) {
          console.error(error);
        }
      };


}

export default new CountServices();