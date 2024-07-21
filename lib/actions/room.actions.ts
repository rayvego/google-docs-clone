"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "@/lib/liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "@/lib/utils";

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      defaultAccesses: ["room:write"],
      usersAccesses,
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error: any) {
    console.error("Error creating document: ", error);
  }
};

export const getDocument = async ({ roomId, userId }: { roomId: string; userId: string }) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);
    if (!hasAccess) {
      throw new Error("You don't have access to this document");
    }

    return parseStringify(room);
  } catch (error: any) {
    console.error("Error getting document: ", error);
  }
};

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    revalidatePath(`/document/${roomId}`);

    return parseStringify(updatedRoom);
  } catch (error: any) {
    console.error("Error updating document: ", error);
  }
};

export const getDocuments = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: email });

    return parseStringify(rooms);
  } catch (error: any) {
    console.error("Error getting documents: ", error);
  }
};

export const updateDocumentAccess = async ({ roomId, email, userType, updatedBy }: ShareDocumentParams) => {
  try {
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    };

    const room = await liveblocks.updateRoom(roomId, {
      usersAccesses,
    });

    if (!room) {
      // TODO: Send a notification to the user
    }

    revalidatePath(`/document/${roomId}`);
    return parseStringify(room);
  } catch (error: any) {
    console.error("Error updating document access: ", error);
  }
};

export const removeCollaborator = async ({ roomId, email }: { roomId: string; email: string }) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    if (room.metadata.email === email) {
      throw new Error("You can't remove yourself from the document");
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null,
      },
    });

    revalidatePath(`/document/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (error: any) {
    console.error("Error removing collaborator: ", error);
  }
};