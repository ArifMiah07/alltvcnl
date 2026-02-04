// testing local storage more simply :>

const TestLocalStorage = () => {
  return (
    <section>
      {/* hello */}
      <div>
        <form>
          <div>
            <label htmlFor="persons_info">Person&apos;s information</label>
            <div>
              <input
                type="text"
                id="person"
                placeholder="enter person's name"
              />
            </div>
            <div>
              <input type="text" id="age" placeholder="enter person's age" />
            </div>
            <div>
              <input
                type="text"
                id="online_url"
                placeholder="enter person's active presence in the internet"
              />
            </div>
            <div>
              <input
                type="text"
                id="status"
                placeholder="enter person's current status"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TestLocalStorage;
