# Backend API Requirements 后端API需求

## Current Issue 当前问题

前端现在用的全是写死的假数据 - 患者名字、请求的文档、授权书等等。这些数据应该从后端动态获取。

The frontend is using hardcoded mock data for everything - patient names, requested documents, authorization forms. This data should be fetched dynamically from the backend.

## Missing Endpoints 缺失的接口

### 1. 获取Provider请求详情 Get Provider Request Details
**Endpoint:** `GET /provider/request/{provider_request_id}`

**用途:** 当provider访问上传页面时，获取这次请求的所有信息
- 患者信息（姓名、生日、留言）
- 需要上传哪些文档
- 患者的授权信息

### 2. 下载患者授权书 Download Patient Authorization  
**Endpoint:** `GET /provider/authorization/{provider_request_id}/download`

**用途:** 让provider可以查看/下载患者签署的授权文件，确认患者已经同意分享医疗记录

### 3. 改进现有的上传链接接口
**Current:** `GET /provider/upload-link/{provider_request_id}`

**问题:** 现在只返回token，但前端不知道这个token对应的是哪个患者、哪些文档

**建议:** 返回token的同时，也返回request_id或者让token能关联到具体的请求信息

## Implementation Flow 实现流程

1. **Provider访问上传页面** Provider accesses upload page: `/upload/{provider_request_id}`

2. **前端调用** Frontend calls `GET /provider/request/{provider_request_id}`
   - 获取患者信息 Get patient info
   - 获取请求的文档列表 Get requested documents list
   - 获取授权信息 Get authorization info

3. **显示信息并提供下载链接** Display info and provide download link
   - 患者授权书下载 Patient authorization download

4. **获取上传token** Get upload token via existing endpoint

5. **上传文件** Upload files with token

## Security Considerations 安全考虑

1. **Provider Request ID验证** - 确保 provider_request_id 是有效的且未过期
   Ensure provider_request_id is valid and not expired

2. **访问控制** - 这些接口应该是公开的（通过 provider_request_id 访问），不需要额外认证
   These endpoints should be public (accessed via provider_request_id), no additional auth needed

3. **数据隐私** - 只返回必要的患者信息，避免泄露敏感数据
   Only return necessary patient info, avoid leaking sensitive data

## Benefits 好处

1. **动态数据** Dynamic data - 每个请求都有真实的患者信息和文档要求
   Each request has real patient info and document requirements

2. **可追溯性** Traceability - 可以追踪哪个provider上传了什么文档
   Can track which provider uploaded which documents

3. **更好的用户体验** Better UX - Provider可以确认他们在为正确的患者上传正确的文档
   Providers can confirm they're uploading the right documents for the right patient

## Priority 优先级

**High Priority 高优先级:**
- GET /provider/request/{provider_request_id}

**Medium Priority 中优先级:**
- GET /provider/authorization/{provider_request_id}/download

**Low Priority 低优先级:**
- Enhancement to upload-link endpoint