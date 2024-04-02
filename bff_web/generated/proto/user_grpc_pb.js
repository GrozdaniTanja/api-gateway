// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var user_pb = require('./user_pb.js');

function serialize_com_tanja_user_service_CreateUserRequest(arg) {
  if (!(arg instanceof user_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type com.tanja.user_service.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_tanja_user_service_CreateUserRequest(buffer_arg) {
  return user_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_tanja_user_service_DeleteUserRequest(arg) {
  if (!(arg instanceof user_pb.DeleteUserRequest)) {
    throw new Error('Expected argument of type com.tanja.user_service.DeleteUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_tanja_user_service_DeleteUserRequest(buffer_arg) {
  return user_pb.DeleteUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_tanja_user_service_DeleteUserResponse(arg) {
  if (!(arg instanceof user_pb.DeleteUserResponse)) {
    throw new Error('Expected argument of type com.tanja.user_service.DeleteUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_tanja_user_service_DeleteUserResponse(buffer_arg) {
  return user_pb.DeleteUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_tanja_user_service_EditUserRequest(arg) {
  if (!(arg instanceof user_pb.EditUserRequest)) {
    throw new Error('Expected argument of type com.tanja.user_service.EditUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_tanja_user_service_EditUserRequest(buffer_arg) {
  return user_pb.EditUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_tanja_user_service_GetUserRequest(arg) {
  if (!(arg instanceof user_pb.GetUserRequest)) {
    throw new Error('Expected argument of type com.tanja.user_service.GetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_tanja_user_service_GetUserRequest(buffer_arg) {
  return user_pb.GetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_tanja_user_service_UserResponse(arg) {
  if (!(arg instanceof user_pb.UserResponse)) {
    throw new Error('Expected argument of type com.tanja.user_service.UserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_tanja_user_service_UserResponse(buffer_arg) {
  return user_pb.UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  createUser: {
    path: '/com.tanja.user_service.UserService/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.CreateUserRequest,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_com_tanja_user_service_CreateUserRequest,
    requestDeserialize: deserialize_com_tanja_user_service_CreateUserRequest,
    responseSerialize: serialize_com_tanja_user_service_UserResponse,
    responseDeserialize: deserialize_com_tanja_user_service_UserResponse,
  },
  getUser: {
    path: '/com.tanja.user_service.UserService/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetUserRequest,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_com_tanja_user_service_GetUserRequest,
    requestDeserialize: deserialize_com_tanja_user_service_GetUserRequest,
    responseSerialize: serialize_com_tanja_user_service_UserResponse,
    responseDeserialize: deserialize_com_tanja_user_service_UserResponse,
  },
  editUser: {
    path: '/com.tanja.user_service.UserService/EditUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.EditUserRequest,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_com_tanja_user_service_EditUserRequest,
    requestDeserialize: deserialize_com_tanja_user_service_EditUserRequest,
    responseSerialize: serialize_com_tanja_user_service_UserResponse,
    responseDeserialize: deserialize_com_tanja_user_service_UserResponse,
  },
  deleteUser: {
    path: '/com.tanja.user_service.UserService/DeleteUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.DeleteUserRequest,
    responseType: user_pb.DeleteUserResponse,
    requestSerialize: serialize_com_tanja_user_service_DeleteUserRequest,
    requestDeserialize: deserialize_com_tanja_user_service_DeleteUserRequest,
    responseSerialize: serialize_com_tanja_user_service_DeleteUserResponse,
    responseDeserialize: deserialize_com_tanja_user_service_DeleteUserResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
