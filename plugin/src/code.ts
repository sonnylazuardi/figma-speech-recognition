/* global figma, __html__*/

figma.showUI(__html__, { width: 300, height: 400 });

function generateUserID() {
  //@ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (a: any) =>
    (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
  );
}

const createNewUserID = async () => {
  const newID = generateUserID();
  await figma.clientStorage.setAsync("userId", newID);
  return newID;
};

export const getUserID = async () => {
  const userId = await figma.clientStorage.getAsync("userId");
  if (userId && userId.length > 5) {
    return userId;
  } else {
    const result = await createNewUserID();
    return result;
  }
}

async function replaceText(node, text, fontSize) {
  let len = text.length;
  for (let i = 0; i < len; i++) {
    //@ts-ignore
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  }
  node.fontName = { family: "Inter", style: "Regular" }
  node.fontSize = fontSize
  node.characters = text;
}

figma.ui.onmessage = msg => {

  if (msg.type === 'add-text') {
    let y = 0;
    const current = figma.currentPage.selection[0];
    if (current) {
      y = current.y + current.height + 24;
    }

    const page = figma.currentPage;
    let node = figma.createText();
    replaceText(node, msg.data.text, 16)

    page.appendChild(node)
    node.y = y;
    figma.currentPage.selection = [node]
  }

  if (msg.type === 'append-text') {
    let node = figma.currentPage.selection[0];
    replaceText(node, msg.data.text, 16)
  }

  if (msg.type === 'notify') {
    figma.notify(msg.data.message);
  }

  if (msg.type === 'window-resize') {
    figma.ui.resize(msg.data.width, msg.data.height);
  }

  if (msg.type === 'get-user-id') {
    getUserID().then(userId => {
      figma.ui.postMessage({ type: 'get-user-id', data: { userId } })
    })
  }

  if (msg.type === 'set-user-id') {
    figma.clientStorage.setAsync("userId", msg.data.userId);
  }
};



