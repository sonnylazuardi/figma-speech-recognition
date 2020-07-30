export const setUserId = (userId: string) => {
  parent.postMessage(
    {
      pluginMessage: {
        type: "set-plugin-data",
        data: { userId },
      },
    },
    "*"
  );
}

export const getUserId = () => {
  return new Promise((resolve, reject) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "get-user-id",
        },
      },
      "*"
    );
    window.onmessage = (event: any) => {
      let message = event.data.pluginMessage;
      const { type, data } = message;
      if (type == "get-user-id") {
        resolve(data.userId);
      }
    };
  })
}